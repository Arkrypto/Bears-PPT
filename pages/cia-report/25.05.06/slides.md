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

## Privacy-Aware Secure Region-Based Handover for  Small Cell Networks in 5G-Enabled  Mobile Communication

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    认证小组会汇报 — 2025.05.06
    <!--<carbon:arrow-right class="inline"/>-->
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/Arkrypto" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---
transition: fade-out
---

# 目录

<Toc></Toc>

---

# Sanitizable Sigatures

可擦除签名

<div grid="~ cols-2 gap-4">
<div>

签名参与者：1️⃣ 签名者 2️⃣ 擦除者 3️⃣ 验签者

回顾一下正常的签名验签过程，假设有明文信息`M`

```json
M = {"姓名" = "张三", "身份证号" = "123456789"}
```

签名者根据明文`M`的哈希值进行签名
$$
\sigma=Sign_{sk}(H(M),sk)
$$
验签者需要知晓所有的明文信息 M，判断
$$
\sigma'=Sign_{pk}=(H(M),pk)\stackrel{?}{=}\sigma
$$
相等则验签通过，否则失败

</div>

<div>

现在有个需求，身份证号作为明文信息，我并不想让验签者（公众）知道，所以需要对其进行“擦除”，以基于 RSA 算法的可擦除签名构造方案为例

1️⃣ 签名阶段：首先对明文进行分块

```json
M = {m_1, m_2} = {"姓名":"张三", "身份证号":"123456789"}
```

同时维护一个 boolean 数组`[0,1]`规定 $m_1$ 不可擦除而 $m_2$ 可擦除

而后签名者正常签名，有 $sk=(d,N),\,pk=(e,N)$
$$
\sigma = H(C)^d\quad C=c_1\,||\,c_2\quad c_i=CH(m_i,r_i)
$$
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

<div grid="~ cols-2 gap-4">
<div>

其中 $r_i$ 是一个参与哈希的随机数，$CH$ 是一个变色龙哈希函数（Chameleon Hash），它具有以下特点

$$
CH(m, r) = g^m\cdot h^r\,mod\,p=CH(m',r')
$$
拥有陷门的人可以为任何消息 $m$ 找到冲突 $m'$，使得二者的变色龙哈希值相等

最后输出的签名结构为 $\Sigma=(\sigma,c_1,c_2,r_1,r_2)$，此时明文为 $M=(m_1,m_2)$

2️⃣ 擦除阶段：擦除者对明文 $M={m_1,m_2}$ 中的敏感信息 $m_2$ 进行擦除，替换其为 $m_2'$，利用变色龙哈希的 trapdoor，为 $m_2'$ 计算新的 $r_2'$ 使得
$$
c_2'=CH(m_2',r_2')=c_2
$$
于是得到新的签名结构 $\Sigma'=(\sigma,c_1,c_2,r_1,r_2')$，同时替换明文为 $M'=(m_1,m_2')$

</div>

<div>

3️⃣ 验签阶段：公众通过擦除后的明文信息 $M'=(m_1,m_2)$ 和签名结构 $\Sigma'=(\sigma,c_1,c_2,r_1,r_2')$ 进行比对验证

根据明文组装哈希值
$$
C'=c_1\,||\,c_2'\quad c_1=CH(m_1,r_1)\quad c_2'=CH(m_2',r_2')
$$
验证签名
$$
\sigma^e=H(C)^{ed}=H(C)\stackrel{?}{=}H(C')
$$
实际上就是利用变色龙哈希函数来实现明文在验签上的“等效替换”，使原先有意义的明文信息变成无意义的，从而实现信息的“可擦除”，从密码学角度讲，这是一个典型的 trick

这一过程中，擦除者并不需要争取签名者的同意（即获取密钥），作为可信第三方拥有修改签名的权力，且仍能保证签名的有效性

</div>
</div>

---

# 5G Secure Handover Scheme

Privacy-Aware Secure Region-Based Handover for  Small Cell Networks in 5G-Enabled  Mobile Communication

为了应对 5G 与小型蜂窝网络（SCN）的挑战

1. 5G 网络通过密集部署小型蜂窝基站（Small Cells Networks）提升容量和覆盖质量，但频繁的切换（Handover, HO）导致**高延迟**、**安全风险**和**隐私泄露**
2. 传统 5G-AKA（Authentication and Key Agreement）协议存在缺陷，如缺乏**完美前向安全性（PFS）**、**匿名性不足**，且无法有效支持小型蜂窝网络的频繁切换

文章提出了基于区域的网络切换方案，共包含三个隐私保护协议

- 1️⃣ **初始认证协议**：用户首次接入网络时建立信任关系
- 2️⃣ **区域内切换协议（Intra-region HandOver）**：在同一区域内的不同站点之间快速切换，利用预共享密钥和本地认证
- 3️⃣ **区域间切换协议（Inter-region HandOver）**：跨区域切换时，通过 gNB 的协作更新用户证书，确保匿名性

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

<center><img src="/cia-report/25-05.06/image-20250430194743600.png" style="width:55%"></center>

核心贡献

- 1️⃣ **隐私保护**：通过伪身份（PID）和临时身份（TID）实现用户匿名性，防止身份追踪
- 2️⃣ **安全认证**：基于非对称密钥认证和可擦除签名（Sanitisable Signatures），支持无缝切换
- 3️⃣ **动态成员撤销**：使用动态非成员累加器（Dynamic Universal Accumulator），高效管理被撤销的用户，减少通信开销


---

## Notation Used in Proposed Scheme

<br>

| **Natation** | **Meaning**                        |
| ------------ | ---------------------------------- |
| AuC          | Authentication centre              |
| gNB & HgNB   | Base station and home base station |
| UE           | User equipment                     |
| EID          | gNB Identity                       |
| ZUID         | Zone user ID                       |
| HID          | HgNB Identity                      |
| Ru-ID        | Region user ID                     |

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

---

| **Natation**      | **Meaning**                       |
| ----------------- | --------------------------------- |
| RID               | Region Identity                   |
| $\pi_U$           | non-membership witness            |
| PID, TID          | User pseudo IDs                   |
| $T_U$             | User subscription validity period |
| $RL_vRL_{new}$    | Revocation list                   |
| $k_i$             | Long-term key                     |
| $k_s$             | Session key                       |
| $AE.Enc\{k_i,m\}$ | Authenticated encryption          |

---

| **Natation**                      | **Meaning**                            |
| --------------------------------- | -------------------------------------- |
| $AE.Dec\{k_i,m\}$                 | Authenticated decryption               |
| $CERT_H$                          | HgNB certificate                       |
| $CERT_U$                          | UE certificate                         |
| $pk_{sig}^{AuC},sk_{sig}^{AuC}$   | AuC public and secret signing keys     |
| $pk_{san}^{gNB},sk_{gNB}^{san}$   | gNB public and secret sanitising keys  |
| $pk_{sig}^{HgNB},sk_{sig}^{HgNB}$ | HgNB public and secret sanitising keys |
| ACK                               | Acknowledgement                        |
| $\sigma$                          | Signature                              |

---

## 初始认证协议

<div grid="~ cols-2 gap-4">


<div>
<img src="/cia-report/25-05.06/image-20250415172355282.png" style="height:70%; margin-top:7px">







</div>

<div>
The Initial Authentication Phase of our proposed 5G Secure Handover Scheme

通过 TID 和 PID 实现匿名性



</div>

</div>

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


---

## 区域内切换协议

<div grid="~ cols-2 gap-12">



<div>
<img src="/cia-report/25-05.06/image-20250415172455308.png" style="margin-bottom:7px; margin-top:4px;">




The Intra-region Handover Protocol of our proposed 5G Secure Handover Scheme



</div>

<div>
可擦除签名



</div>

</div>

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

---

## 区域间切换协议

<div grid="~ cols-2 gap-8">


<div>
<img src="/cia-report/25-05.06/image-20250427175532272.png" style="height:85%; margin-top:6px">




</div>

<div>
The Inter-region Handover Protocol of our proposed 5G Secure Handover Scheme


</div>

</div>

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

---
layout: center
class: text-center
---

# 感谢观看

Thanks for Watching

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
