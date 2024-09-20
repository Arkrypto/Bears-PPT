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

RFID，射频认证，通过天线电磁波进行数据交换，实现标签与计算机系统的认证，如下为一个一般的 RFID 系统示意图

<img src="/rfid-system.png" style="height:40%;clear:both;margin:auto">

<br>

有点像 Web 中的表单验证，区别在于

- 数据传输介质不同，在 RFID 系统中数据通过电磁波交换
- 表单并非用户主动提交，而是服务器对客户端进行**挑战-响应**

---

##  LPN 问题

<br>

> 轻量加密是 RFID 系统安全的主要研究方向

RFID 系统具有严格的资源约束（主要是为了降低电子标签的成本，需要满足批量应用），利用传统的非对称加密、对称加密以及哈希算法是不合理的。并且，随着量子计算机发展，传统的公钥算法可以通过 Shor 算法在量子计算机上求解，故一个现代的 RFID 加密系统一般要满足两个条件：轻量级和抗量子计算

基于 LPN 问题

$$
y_i=a_i\cdot s+e_i
$$

LPN 问题被证明是抗量子的，其主要的攻击方式是中间人攻击

因为单边认证在大多数 HB 协议族中执行。标签阅读器通信总是被认为是安全的，只有 RFID 标签模拟的可能性。然而，物联网需要相互认证。使用两个独立的认证协议会导致中继攻击、重放攻击、非同步攻击、会话劫持等的风险更高

---

## HB 协议族

**HB 协议** 是由 Hopper 和 Blum 在 2001 年提出的，主要用于 RFID 设备的身份认证。它依赖于 LPN 问题的难解性。HB 协议的基本流程如下：

1. **初始化**：认证方和设备共享一个秘密向量 c
2. 认证过程
   - 认证方向设备发送一个随机生成的挑战向量 c
   - 设备计算 y = c⋅s + e，其中 e 是一个噪声值
   - 设备将响应 y 发送给认证方
   - 认证方根据自己的 s 和已知的噪声模型来验证设备发送的响应是否正确

**缺点**：

- HB 协议虽然简单且有效，但它容易受到**主动攻击**，即攻击者可以通过伪造的挑战来获取设备的密钥信息
- HB 协议族易受中间人攻击

<kbd style="float:right">下一页 ——></kbd>

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

## DB 协议

Distance Bounding Potocols，距离边界协议

对于 HB 协议族遭受的中间人攻击，距离边界界定技术被认为是解决此类问题的一个好办法，其核心思想是：基于信号的传播速度等于光速这一事实来测量一个消息在阅读器和标签之间来回传输的往返时间（RTT），并以此来计算出阅读器和标签间的真实距离

- 即，通过计算读写器和标签的物理距离来识别诚实用户

由于这一计算由 RFID 的应用系统实现，故并不会受到读写器和标签的资源限制

---

# 论文主要工作

An Ultra‑Lightweight Mutual Authentication Protocol Based on LPN Problem with Distance Fraud Resistant

主要工作：

- 提出了一种基于 HB 家族协议和 LPN 问题的轻量双向认证协议
- 采用 DB 协议抵抗与距离相关的攻击
- 双向认证和距离边界协议共同作用下，能够在不使用经典加密协议的情况下抵抗 GRS 攻击

他的某一步计算类似于 HB+（涉及矩阵运算），一定要回头看看

<kbd style="float:left"><a href="/An Ultra-Lightweight Mutual Authentication Protocol Based on LPN Problem with Distance Fraud Resistant.pdf">点此下载完整论文</a></kbd>

<kbd style="float:right">下一页 ——></kbd>

---

<div grid="~ cols-2 gap-4">

<div>

双向认证步骤

<img src="/image-20240921003255964.png">

</div>

<div>

注意力公式


$$
Attention(Q,K,V) = softmax(\frac{QK^T}{\sqrt{d_k}})V
$$

```python
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> res;
        res.push_back(1);
        for(int i = 0; i < rowIndex; i++){
            res.push_back((long)res[i]*(rowIndex-i)/(i+1));  
        }
        return res;
    }
};

```





</div>

</div>

---

<div grid="~ cols-2 gap-4">

<div>

距离边界步骤

<img src="/image-20240921003840795.png">

</div>

<div>

难绷啊

```python
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> res;
        res.push_back(1);
        for(int i = 0; i < rowIndex; i++){
            res.push_back((long)res[i]*(rowIndex-i)/(i+1));  
        }
        return res;
    }
};

```

</div>

</div>

---
layout: center

class: text-center
---

# 感谢观看

敬请批评指正
