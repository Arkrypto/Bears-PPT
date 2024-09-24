---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://source.unsplash.com/collection/94734566/1920x1080
background: /xdu.jpg
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
# page transition
transition: slide-left
# use UnoCSS
css: unocss
---

## An Ultra‑Lightweight Mutual Authentication Protocol Based on LPN Problem with Distance Fraud Resistant



<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    控制访问小组会汇报（2024.10.3）
    <!--<carbon:arrow-right class="inline"/>-->
  </span>
</div>





<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/canoe95" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>
<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->



---

# 目录

<br>

```
Directory ———— 按 o 浏览缩略图
```

<br>

<Toc></Toc>

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

| 协议              | 主要特性                       | 安全性               | 抗攻击类型                                       | 应用场景              |
| ----------------- | ------------------------------ | -------------------- | ------------------------------------------------ | --------------------- |
| **HB（01）**      | 基于 LPN，轻量级               | 易受主动攻击         | 抵御被动攻击                                     | RFID、嵌入式          |
| **HB+（05）**     | 双密钥结构，抗主动攻击         | 抵御主动攻击         | 抵御主动攻击和重放攻击                           | 物联网、身份认证      |
| **HB++（06）**    | 多轮交互，抗并行攻击           | 高安全性             | 抵御并行和物理攻击                               | RFID、车联网          |
| **HB#（08）**     | 加强随机化                     | 更强的安全性         | 抵御主动攻击和重放攻击，但无法完全抵御中间人攻击 | 高安全需求的 IoT      |
| **IHB（15）**     | 改进的随机化机制、双重认证机制 | 更高的安全性         | 抵御中间人攻击、主动攻击、重放攻击               | RFID、物联网设备      |
| **PUF-HB+（11）** | 结合物理不可克隆函数           | 硬件防克隆，动态响应 | 抵御物理攻击和克隆攻击                           | 高安全 RFID、军事设备 |

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

## 基于 LPN 的双向认证

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

</div>


<div>
<img src="/image-20240921003255964.png" style="margin-top:9px">

</div>

</div>

---

认证步骤（续）

4、认证标签

5、读写器密钥更新

6、认证读写器

7、标签密钥更新

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
4. 通过这个物理距离来识别诚实用户

由于这一距离的计算由 RFID 的应用系统实现，故并不会受到读写器和标签的资源限制

</div>

<div>
<img src="/image-20240921003840795.png" style="margin-top:14px">


</div>

</div>

---
layout: center

class: text-center
---

# 感谢观看

敬请批评指正
