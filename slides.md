---
theme: seriph
background: /xdu.jpg
class: 'text-center'
# highlighter: shiki
lineNumbers: false
info: |
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
drawings:
  persist: false
transition: slide-left
css: unocss
---

## An Ultra‑Lightweight Mutual Authentication Protocol Based on LPN Problem with Distance Fraud Resistant



<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    控制访问小组会汇报（2024.10.10）
    <!--<carbon:arrow-right class="inline"/>-->
  </span>
</div>






<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit/>
  </button>
  <a href="https://github.com/northboat" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github/>
  </a>
</div>
<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->



---

# 目录

> `O`键浏览缩略图，`F`全屏，`D`切换夜间模式

<Toc style="margin-top:9px"></Toc>

---
transition: fade-out
---

# RFID 概述

Radio Frequency Identification

RFID，射频认证，通过天线电磁波进行数据交换，实现标签与计算机系统的认证，如下为一个一般的 RFID 系统

<img src="/rfid-system.png" style="height:30%;clear:both;margin:auto">

<br>

类似于 Web 中的表单验证，区别在于

1. 数据传输介质不同，在 RFID 系统中数据通过电磁波交换
2. 表单并非用户主动提交，而是服务器对客户端进行**挑战-响应**
3. RFID 系统有严格的资源约束，**轻量加密**是 RFID 安全的主要研究方向，对称/非对称加密、哈希通常不被考虑
4. 并且，随着量子计算机发展，我们希望一个现代的 RFID 加密系统是**抗量子**的

---

##  LPN 问题

<br>

> learning parity with noise，带噪声的学习奇偶校验问题

LPN 是一个重要的抗量子计算的困难问题，其形式化描述如下

- 设有密钥 s 和随机向量**组** a，每个向量均为长度为 n 且元素为模 2 的整数（即元素为 0/1 ）
- 根据某种概率分布（常为伯努利分布）生成一组随机向量 e（所谓噪声）

基于这随机向量组`a`、噪声` e`和密钥`s`，我们计算观测值`y`，有
$$
y_i=a_i\cdot s+e_i
$$

攻击者的目的则为，从密文 y 中还原出密钥 s，这样的问题被证明是抗量子的，而真正的接收者由于共享密钥 `s`，通过计算没有噪声的观测值
$$
\hat{y_i}=a_i\cdot s
$$
与带噪声的观测值进行比较，对发送者的身份进行验证，可以看到它是一个概率问题，加解密并不依赖于计算量，故常用于轻量加密方案

---

## HB 协议族

<br>

> 由 *Hopper and Blum* 在 2001 年提出的轻量认证协议


<div grid="~ cols-2 gap-4">

<div>

基于 LPN 问题的轻量加密协议，广泛用于 RFID、物联网设备的身份认证。以 HB+ 协议为例，其单轮认证的基本流程如下：

<img src="/image-20240924204104518.png" style="height:67%">

</div>

<div>

详细步骤


1. 初始化：读写器和标签共享两个密钥 x 和 y
2. 提交：标签生成一组随机向量 b 提交给读写器
3. 挑战：读写器接收向量 b，并发送一组随机生成的挑战向量 a 给标签
4. 响应：标签根据公式`z = a⋅x + b⋅y + r`计算出响应 z，并将其发送回读写器。其中 r 为单比特的噪声
5. 验证：认证方根据共享密钥 x 和 y 计算出期望的响应（无噪声），并与标签的响应 z 进行对比，如果匹配（差异不超过预期的噪声比例），则认证成功

在实际使用中，这样的认证将进行数十次甚至上百次

</div>

</div>

---

<img src="/image-20240925132350762.png" style="height:100%;clear:both;margin:auto">

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>
<!--
Here is another comment.
-->

---

## GRS 攻击

<br>

> 由 *Gilbert, Robshaw, and Sibert* 于 2005 年提出的破坏基于 LPN（Learning Parity with Noise）问题的轻量级认证协议

攻击的核心思想为：

- **被动攻击**：攻击者可以通过监听多轮认证协议的执行来收集足够多的带噪声的消息对
- **主动攻击**：攻击者可以在协议执行期间主动修改挑战向量 `a`，并观测由标签生成的响应 `z`

GRS 攻击的高效在于，它利用了标签每次响应中的噪声`r`来推断出标签和读写器共享的密钥`x`。通过反复干扰挑战并分析响应，攻击者可以去除噪声，从而成功地恢复密钥。这意味着攻击者在一段时间内收集足够多的认证消息后，可以完全破译系统密钥，从而伪造合法身份

GRS 攻击的步骤：

1. **被动监听**：攻击者被动监听标签和读写器之间的认证交互，收集多个挑战向量 `a` 和响应值 `z`
2. **主动篡改挑战向量**：攻击者修改某些挑战向量 `a`，并监听相应的响应
3. **噪声消除**：利用收集到的数据，攻击者通过统计分析的方式，逐步消除噪声 `r` 的影响，恢复出密钥 `x`

---

# 论文主要工作

An Ultra‑Lightweight Mutual Authentication Protocol Based on LPN Problem with Distance Fraud Resistant

主要工作：

- 提出了一种基于 HB 协议族和 LPN 问题的轻量双向认证协议，并采用 DB 协议抵抗与距离相关的攻击
- 在双向认证和距离边界协议共同作用下，在不使用经典加密方法的情况下抵抗 GRS 攻击

处理 GRS 攻击的主要思想在每一轮认证中更新密钥，使攻击者无法检测挑战、密钥和响应之间的关系。这可以通过两种方式完成：

1. 在整个协议执行过程中，主要共享密钥保持不变，并根据共享密钥在每一轮开始时生成新的密钥 X。这样，标签中只存储一个密钥，但由于新的密钥生成，认证时间会增加
2. 在本轮认证过程中，双方同步更新或生成下一个身份验证会话所需的密钥。由于在协议开始时，所有密钥在认证前都是已知的，认证效率增加，但内存空间增加了（用于存储额外的密钥）。同时，这种方法或许可以解决去同步问题

本文采用第二种方案处理 GRS 攻击

<kbd style="float:right"><a href="/An Ultra-Lightweight Mutual Authentication Protocol Based on LPN Problem with Distance Fraud Resistant.pdf">点此下载完整论文</a></kbd>

---

## 基于 LPN 问题的双向认证

<br>

> 先由读写器认证标签身份，再由标签认证读写器身份，过程类似于 TCP 三次握手

<div grid="~ cols-2 gap-4">

<div>


认证步骤

1、初始化

读写器维护每个标签的密钥 $X_{current}, X_{recover}$，标签维护密钥 X，一般情况下 $X_{current} = X$，为共享密钥，均为 k × m 的矩阵

2、挑战

读写器发送一个长为 k 的挑战向量 a 给标签

3、密文计算

标签生成一组 k 长的随机向量 c，作为“对读写器的挑战”，同时参与密文的计算和本次认证

</div>

<div>
<img src="/image-20240924233133744.png" style="margin-top:9px;height:95%">


</div>

</div>

---


<div grid="~ cols-2 gap-4">

<div>
3、密文计算（续）

再生成噪声向量 v1，至此 a、c 为长度为 k 的向量，v1 为长度为 m 的向量，X 为 k × m 的矩阵，计算密文 z1（长度为 m 的向量）
$$
z1 = (a\oplus c)\cdot X\oplus v1\tag{1}
$$
并对 z1 进行二次处理，求得 m × k 的矩阵 B
$$
B\,|\,B* X=z1\tag{2}
$$
其中 * 运算定义为
$$
z1[i]=row[i](B)\cdot col[i](X)
$$
而后将矩阵 B 作为认证的密文发送回读写器，同时将随机向量 c 发给读写器

4、一次认证

读写器收到密文矩阵 B 和随机向量 c

</div>

<div>
<img src="/image-20240924233133744.png" style="margin-top:4px;height:96%">




</div>

</div>

---

<div grid="~ cols-2 gap-4">
<div>
4、一次认证（续）


自身已知向量 a 和共享密钥 X，于是由 (1)(2) 可反向计算噪声 v1
$$
\begin{aligned}
v1&=(a\oplus c)\cdot X_{current}\oplus z1\\
&=(a\oplus c)\cdot X_{current}\oplus B*X
\end{aligned}
\tag{3}
$$
如果 (3) 式计算的噪声不符合预期（概率分布），则考虑是否在上一次认证的 step6 中发生了消息丢失（即读写器更新了密钥而标签尚未更新的情况），采用$X_{recover}$进行认证，公式与 (3) 一致
$$
\begin{aligned}
v1&=(a\oplus c)\cdot X_{recover}\oplus z1\\
&=(a\oplus c)\cdot X_{recover}\oplus B*X
\end{aligned}
\tag{4}
$$
如果两种密钥均未验证通过，则本轮读写器对标签的认证失败，认为该标签非法。而后发送一个随机矩阵 D 给标签（作为胡乱的答复）（it avoids MIM attack）

</div>

<div>
<img src="/image-20240924233133744.png" style="margin-top:4px;height:96%">



</div>

</div>

---

<div grid="~ cols-2 gap-4">
<div>
5、密文计算、密钥更新

若认证通过，则计算发给标签的响应，由读写器端生成一组 m 位的随机噪声 v2，将标签发给读写器的随机向量 c （充当标签对服务器的“挑战”）作为参数进行加密，获得密文 z2


加密公式如下，得到一个 m 位的向量 z2
$$
z2 = B*X_{current}\oplus c\cdot X_{current}\oplus v2\tag{5}
$$
同样的，我们采取相同的处理方式对密文 z2 二次处理，得到加密矩阵 D 并作为 c 的响应发回标签
$$
D\,|\,D*X_{current}=z2\tag{6}
$$
计算完毕后，对服务器端的密钥进行更新，更新规则如下
$$
\begin{aligned}
&X_{recover}=X_{current}\\
&X_{current}=(X_{current}\underline{\oplus}v1).(X_{current}\underline{\oplus}v2)
\end{aligned}
\tag{7}
$$

</div>

<div>
<img src="/image-20240924233133744.png" style="margin-top:4px;height:96%">





</div>

</div>

---

<div grid="~ cols-2 gap-4">

<div>
6、二次认证、密钥更新

标签接收由读写器发回的响应矩阵 D，进行如下计算
$$
\begin{aligned}
v2 &= D*X\oplus c\cdot X\oplus z2\\
&=D*X\oplus c\cdot X\oplus B*X
\end{aligned}
\tag{8}
$$
其中 c 是在标签响应读写器时生成的随机向量（挑战），由此可计算出读写器生成的噪声 v2，并检验其是否符合概率分布

- 汉明权重是否低于事先设置的阈值

若符合，则认证通过，本次双向认证成功，标签方对自身密钥进行更新（和读写器的更新策略一样）
$$
X=(X\underline{\oplus}v1).(X\underline{\oplus}v2)\tag{9}
$$
否则，认证失败，认为当前读写器为非法设备，不进行密钥更新



</div>

<div>
<img src="/image-20240924233133744.png" style="margin-top:4px;height:97%">



</div>
</div>

---

## 距离边界协议

<br>

> Distance Bounding Potocols，距离边界协议

<div grid="~ cols-2 gap-4">

<div>


对于 HB 协议族遭受的中间人攻击，距离边界界定技术被认为是解决此类问题的一个好办法，其核心思想是：

1. 基于信号的传播速度等于光速这一事实
2. 测量一个消息在阅读器和标签之间来回传输的往返时间（RTT）
3. 以 RTT 来计算出阅读器和标签间的真实距离
4. 通过物理距离来识别诚实用户（不存在中间人）

在本文的 DB 协议中，采用 RBE（rapid bit exchange）和混合挑战，以快速、安全的进行 RTT 的测量，并与事先设定的时间阈值进行比较，判断标签的合法性

</div>

<div>

协议步骤：

<img src="/image-20240921003840795.png" style="margin-top:14px;height:80%">

</div>

</div>

---

<div grid="~ cols-2 gap-4">
<div>


1、初始化

这里将用到在认证过程中使用过的随机向量 a（读写器发给标签 k 长的挑战向量），通过共享密钥 X 计算 m 位的向量 z2，有
$$
z_2 = a\cdot X_{current}=a\cdot X
$$
并且将该向量等分为三份 t、q、r，其中
$$
\begin{aligned}
&t=z_2[1],z_2[2],\ldots,z_2[\frac{m}{3}]\\
&q=z_2[\frac{m}{3}+1],z_2[\frac{m}{3}+2],\ldots,z_2[\frac{2m}{3}]\\
&r=z_2[\frac{2m}{3}+1],z_2[\frac{2m}{3}+2],\ldots,z_2[m]
\end{aligned}
$$
这步计算在读写器和标签中同步进行。另外，读写器将维护一个允许的最大 RTT，作为超时的判定，记作$\triangle t_{max}$

</div>

<div>
<img src="/image-20240921003840795.png" style="margin-top:14px;height:94%">
</div>




</div>

---

<div grid="~ cols-2 gap-4">
<div>
2、快速比特交换（RBE）

比特交换由读写器发起，首先读写器生成一组 k 长的随机向量 l 和噪声向量 v1，根据 l 与 v1 计算挑战向量 c，计算方法如下
$$
c[i]=
\begin{cases}
l[i]\quad &t[i]=0\\
v1[i]\quad &t[i]=1
\end{cases}
$$
而后记录本轮的开始时间 t1，将`c[i]`发送给标签（注意这里发送的是单个比特），这样的交换将一共进行 k 轮

标签接收该比特数据后，将计算响应比特`d[i]`
$$
d[i]=
\begin{cases}
q[i]\quad &t[i]=0\,\,\&\&\,\,c[i]=0\\
r[i]\quad &t[i]=0\,\,\&\&\,\,c[i]=1\\
r[i]\quad &t[i]=1\,\,\&\&\,\,c[i]=v1[i]\\
random\quad &t[i]=1\,\,\&\&\,\,c[i]\neq v1[i]
\end{cases}
$$


</div>

<div>
<img src="/image-20240921003840795.png" style="margin-top:	4px;height:96%">
</div>





</div>

---

<div grid="~ cols-2 gap-4">
<div>
2、快速比特交换（续）

需要注意的是，若读写器在 DB 协议的以往任意一轮给标签发送了 Error 信息，那么在这一步，标签给予读写器的响应`d[i]`将均为一个随机的比特变量，即
$$
d[i] = random\,\,bit
$$
标签生成`d[i]`完毕后，将该比特数据发送回读写器

读写器收到`d[i]`的同时，记录比特交换的截止时间 t2，并与 t1 作差得到本轮交换所耗时间$\triangle t_i$

最后，与事先设定的最长时延作比较，若
$$
\triangle t_i > \triangle t_{max}
$$
则本轮距离认证未通过，读写器发送给标签一个 Error 信息，结束本次认证；否则，继续下一轮比特交换直到认证成功

</div>

<div>
<img src="/image-20240921003840795.png" style="margin-top:	14px;height:95%">
</div>




</div>

---

<div style="width:80%;clear:both;margin:auto;margin-top:5%">

<div style="text-align:center">

# 总结

<p><center>"An Ultra‑Lightweight Mutual Authentication ProtocolBased on LPN Problem with Distance Fraud Resistant"</center></p>

</div>

考虑到物联网在当今生活中的日益应用，其安全和隐私要求以及现有认证协议的漏洞是非常重要的问题。在本文中，提出了一种新的基于 LPN 问题的超轻量级互认证协议，该方案具有三个主要属性

- 它可以在 NFC 和 RFID 等低成本资源有限的设备上作为安全轻量级协议
- 由于 LPN 问题的性质，它适用于后量子密码学
- 它解决了 GRS 攻击等 HB 协议的弱点，在不使用数字签名的情况下抵抗恐怖欺诈、伪装欺诈和距离欺诈攻击

同时给出了数学的证明，证明该协议能够解决 HB 协议已知的弱点和攻击

</div>

---
layout: center

class: text-center
---

# 感谢观看

敬请批评指正
