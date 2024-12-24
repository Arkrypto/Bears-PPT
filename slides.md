---
theme: seriph
background: /xdu.jpg
class: 'text-center'
highlighter: shiki
lineNumbers: false
info: |
  Presentation slides for developers.
  Learn more at [Sli.dev](https://sli.dev)
drawings:
  persist: false
transition: slide-left
css: unocss
---

## CRYSTALS-Dilithium: A Lattice-Based Digital Signature Scheme

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    认证小组组会汇报（2025.01.02）
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

页面操作：`O`浏览缩略图，`F`全屏，`D`夜间模式

<Toc style="margin-top:9px"></Toc>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  margin-bottom: 25px;
}
</style>
---

# LWE 问题

Learning With Errors

LWE 问题是现代密码学中的一个重要问题，具有广泛的研究价值和应用前景，尤其在抗量子密码领域中，它可以描述为以下形式：

- 给定一个秘密向量 $\mathbf{s} \in \mathbb{Z}_q^n$ 和一个小的噪声分布 $\chi$

- 敌手可以看到多个形式为 $\mathbf{(a_i, b_i)}$ 的样本，其中：
  $$
  b_i = \langle\mathbf{a}_i,\mathbf{s}\rangle + e_i \mod q
  $$
  $\mathbf{a}_i \in \mathbb{Z}_q^n$ 是随机选取的向量，$\langle \mathbf{a}_i, \mathbf{s} \rangle$ 是他们的内积

LWE 问题要求敌手通过观察有限个样本 $\mathbf{(a_i, b_i)}$，恢复出秘密向量 $\mathbf{s}$ 或区分这些样本与随机样本

数学基础：LWE 的安全性基于**短向量问题**（SVP，Shortest Vector Problem）以及**近似最近点问题**（CVP，Closest Vector Problem）的计算困难性上。通过将问题映射到格上，可以证明 LWE 问题在普通情况下难以求解，被认为具备抗量子性；通常，噪声 $e_i$ 选自高斯分布或某种截断分布，以确保其幅度足够小；噪声的引入是问题变得困难的核心原因，没有噪声时，该问题可被快速求解

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>
---

# 基于 LWE 问题的一般签名形式

[An Improved Compression Technique for Signatures Based on Learning with Errors | CT－RSA](https://link.springer.com/chapter/10.1007/978-3-319-04852-9_2)

<div grid="~ cols-3 gap-4">
<div>



密钥生成

<img style="height:50%" src="/cia-report/25-01-02/image-20241224154906911.png">

其中 E 必须是一个足够“小”的噪声，满足短向量性质，否则将**拒绝采样**

</div>

<div>

签名

<img style="height:65%" src="/cia-report/25-01-02/image-20241224184443176.png">

c 和 z 必须即满足短向量性质

</div>

<div>

验签

<img style="height:50%" src="/cia-report/25-01-02/image-20241224184557214.png">

对签名值 (z, c) 进行验证，通过 z 计算出哈希值 $c'=H(\lfloor w_d\rceil,\mu)$ 并与 c 进行比较实现验签

</div>

</div>

---

# Dilithium 协议

[CRYSTALS-Dilithium: A Lattice-Based Digital Signature Scheme | IACR Transactions on Cryptographic Hardware and Embedded Systems](https://tches.iacr.org/index.php/TCHES/article/view/839)

<div grid="~ cols-2 gap-0">
<div>

<img style="height:80%" src="/cia-report/25-01-02/image-20241216201624341.png">

</div>

<div>
密钥生成



</div>

</div>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>
---
layout: center

class: text-center
---

# 感谢观看

敬请批评指正
