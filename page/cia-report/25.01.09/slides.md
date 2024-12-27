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
    认证小组组会汇报（2025.01.09）
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

<div grid="~ cols-3 gap-6">
<div>



密钥生成

<img style="height:50%" src="/cia-report/25-01-09/image-20241224154906911.png">

其中 E 必须是一个足够小的噪声，满足短向量性质，否则将**拒绝采样**，矩阵 A 和 $T=AS+E$ 构成公钥

</div>

<div>

签名

<img style="height:65%" src="/cia-report/25-01-09/image-20241224184443176.png">

c 和 z 必须即满足短向量性质

</div>

<div>

验签

<img style="height:50%" src="/cia-report/25-01-09/image-20241224184557214.png">

$w=Az-Tc=A(y+Sc)-(AS+E)c=Ay+ASc-ASc-Ec=Ay-Ec\approx v$

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

# 正确性说明

为什么 w ≈ v？

在 **LWE 假设** 的框架下，误差项 E 的大小是受控的，通常是从离散高斯分布中采样的小值。这导致以下性质：

1. **E 的元素范围小于模数 q：**
   噪声 E 的每个元素是一个非常小的整数，通常远小于 q，使得 Ec 的影响有限
2. **c 的稀疏性或小范围值：**
   签名方案中，哈希生成的 c 通常是一个稀疏向量（大部分元素为零）或由较小值组成，从而使得 Ec 本身的范数较小
3. **模 q 下的计算：**
   即使 Ec 有非零值，在模 q 的意义下，这些小值会被视作噪声对 w 的影响较小，可忽略不计

因此，**在统计意义上，w ≈ v**，即 w 和 v 可以被认为是等价的。另外，基于 LWE 的签名方案需要设计使得噪声 Ec 满足“容忍性”，确保签名和验签的正确性。这依赖以下关键点：

- **噪声界限 ∥Ec∥：**
  在构造系统参数时，噪声 ∥Ec∥ 被限制在一个允许的范围内，确保即使 w=v−Ec，验签时通过 Hash(w,μ)=c 的概率依然足够高
- **哈希函数抗扰动性：**
  哈希函数 H(w,μ) 对小的扰动具有抗性，因此 w ≈ v 时，计算出的哈希值 c′ 与 c 相同

但 Ec 实际存在，其值对攻击者来说是不可预测，而对验签者保持签名的正确性

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

# Dilithium 协议

[CRYSTALS-Dilithium: A Lattice-Based Digital Signature Scheme | IACR Transactions on Cryptographic Hardware and Embedded Systems](https://tches.iacr.org/index.php/TCHES/article/view/839)

<div grid="~ cols-2 gap-6">
<div>


**支持函数**

<img style="height:100%;margin-top:6px" src="/cia-report/25-01-09/image-20241225143505916.png">

</div>

<div style="padding-top:42px">



$Decompose_q(r,\alpha)$ — 分解 $r=r_1\alpha+r_0\mod q$

$Power2Round_q(r,d)$ — 根据 $2^d$ 分解 r 的高低位

$HighBits_q(r,\alpha)$ — 获取 r 的高位 $r_1$

$LowBits_q(r,\alpha)$ — 获取 r 的低位 $r_0$

$MakeHint_q(z,r,\alpha)$ — 根据临界值 z 获取进位符 h

$UseHint_q(h,r,\alpha)$ — 还原高位 $r_1=\lfloor\frac{r_0+h}{(q-1)/\alpha}\rfloor$

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

<div grid="~ cols-2 gap-6">
<div>
<img style="height:96%;margin-top:1px" src="/cia-report/25-01-09/image-20241225163019891.png">


</div>

<div>
<strong>密钥生成</strong>


$\rho$ 为随机种子，$ExpandA(\rho)$ 将其映射为一个 k×l 的矩阵 A，计算 $t=As_1+s_2$，CRH 为哈希函数，$(t_1,t_0)$ 分别为 t 被 $2^d$ 分解的高低位

**签名**：$(sk,M)\rightarrow\sigma=(z,h,c)$

$y$ 是从离散高斯分布中采样的随机向量，是签名 $z=y+cs_1$ 的随机性来源，密文 $c=H(\mu||w_1)=H(CRH(tr||M)||HighBits_q(Ay,2\gamma_2))$，这里对 y 有拒绝采样策略，y 必须符合一定的范数限制，以确保签名 z 与密钥 $s_1$ 无关

**验签**：$(pk,M,\sigma)\rightarrow 1/0$

验签者通过公钥和明文计算 $\mu=CRH(tr||M)=CRH(CRH(\rho||t_1)||M)$，再由进位符 h 和密文 z 还原 $w'=Az-ct_1\cdot2^d=Ay+Acs_1-ct_1\cdot2^d$，最后比对 $H(\mu,w_1')$ 和 $c$ 进行验证

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

# 主要贡献

Dilithium 签名于一般形式的优化

在空间开销上，由于高低位的存储方式，其密钥长度大大减小，并且保持计算量级与传统方式一致；在安全性上，我们考虑最后一步的匹配，即验证 $w_1'$ 和 $w_1$ 在验签算法上的一致性，我们已知
$$
w'=Ay+Acs_1-ct_1\cdot2^d
$$
划分高低位有 $t = t_12^d+t_0$，即 $t_1\cdot 2^d=t-t_0$，且 $t = As_1+s_2$，故有
$$
\begin{aligned}
w' &= Ay+Acs_1-c(t-t_0)\\
&=Ay+Acs_1-c(As_1+s_2-t_0)\\
&=Ay-cs_2+ct_0
\end{aligned}
$$
而后考虑 $w'$ 的高位 $w_1'$，其计算方式如下
$$
w_1'=UseHint_1(h,w',2\gamma_2)\overset{?}{=}w_1=HighBits_q(w,2\gamma_2)
$$
$+ct_0$ 在补位 $h$ 时被填充，$+cs_2$ 由于自身的“小”数特性被忽略，较于一般形式多了一项扰动，安全性更高

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
