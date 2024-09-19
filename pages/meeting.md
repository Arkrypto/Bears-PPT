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
    控制访问小组会汇报
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

射频认证

一个常规的 RFID 系统

<img src="/rfid-system.png">



---



## HB 协议族

LPN 问题

$$
y_i=a_i\cdot s+e_i
$$


<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

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
<!--
Here is another comment.
-->

---

## GRS 中间人攻击

physically unclonable functions，物理不可克隆功能

| 课程                    | 成绩    | 掌握程度                                           |
| ----------------------- | ------- | -------------------------------------------------- |
| C++ 程序设计            | 90      | 熟悉 STL，会基本的图形编程                         |
| 高等数学B(一) / (二)    | 94 / 93 | 良好的逻辑思维                                     |
| Java 程序设计           | 97      | 能熟练开发后端 API，了解 JUC 并发编程              |
| Web 开发与应用          | 92      | 能独立使用 HTML/CSS/JS、Vue、Electron 开发前端页面 |
| 计算机网络课程设计      | 95      | 熟悉 Java Socket 及 WebSocket 编程                 |
| Linux操作系统及内核分析 | 88      | 熟悉 Linux 基本命令，能手动部署各种服务器环境      |



<kbd style="float:right"><a href="/grade.pdf">点此浏览完整成绩单</a></kbd>

---

# 论文分享

HB-PUF 在 RFID 系统的一般应用

<kbd style="float:right">下一页 ——></kbd>



&nbsp;&nbsp;[More](https://canoe4.github.io/Pages)

---

# 部分代码实现

《Attention Is All You Need》

<div grid="~ cols-2 gap-4">

<div>



<img src="/transformer.png" style="height:400px">



</div>

<div>

代码复现：Transformer 模型编码器

- 输入嵌入层
- 位置编码
- 多头自注意力层
- 层归一化
- 前馈神经网络

参考：

【1】[Coding a Transformer from scratch on PyTorch, with full explanation, training and inference-YouTube](https://www.youtube.com/watch?v=ISNdQcPhsts)

【2】[A PyTorch implementation of the Transformer model in "Attention is All You Need"](https://github.com/jadore801120/attention-is-all-you-need-pytorch)

</div>

</div>

---

<div grid="~ cols-2 gap-7">

<div>

多头自注意力层：最重要的模块，得到编码器的输入**并使用它三次**，分别为查询、键和值，对应之前提到的注意力公式中的三个重要参数（相当于相同的输入，应用了三次）

注意力公式
$$
Attention(Q,K,V) = softmax(\frac{QK^T}{\sqrt{d_k}})V
$$
代码实现

```python
class MultiHeadAttentionBlock(nn.Module):
    def __init__(self, d_model: int, h: int, dropout: float) -> None:
        super().init()
        self.d_model = d_model
        self.h = h
        assert d_model % h == 0, "d_model is not divisible by h"
        self.d_k = d_model // h
        self.w_q = nn.Linear(d_model, d_model) # Wq 查询
        self.w_k = nn.Linear(d_model, d_model) # Wk 键
        self.w_v = nn.Linear(d_model, d_model) # Wv 值
```



</div>

<div>



```python
        self.w_o = nn.Linear(d_model, d_model) # Wo 注意力输出
        self.dropout = nn.Dropout(dropout)
        
    # 计算我们想要的注意力分数
    @staticmethod
    def attention(query, key, value, mask, dropout: nn.Dropout):
        d_k = query.shape[-1]
        attention_scores = (query @ key.transpose(-2, -1)) / math.sqrt(d_k)
        if mask is not None:
            attention_scores.masked_fill_(mask == 0, -1e9)
        attention_scores = attention_scores.softmax(dim = -1)
        if dropout is not None:
            attention_scores = dropout(attention_scores)
        return (attention_scores @ value), attention_scores

    def forward(self, q, k, v, mask): # 矩阵处理，令三个查询的矩阵和 d_k 相关
        query = self.w_q(q)
        key = self.w_k(k)
        value = self.w_v(v)
        query = query.view(query.shape[0], query.shape[1], self.h, self.d_k).transpose(1, 2)
        key = key.view(key.shape[0], key.shape[1], self.h, self.d_k).transpose(1, 2)
        value = value.view(value.shape[0], value.shape[1], self.h, self.d_k).transpose(1, 2)
        x, self.attention_scores = MultiHeadAttentionBlock.attention(query, key, value, mask, self.dropout)
        # (batch, h, Seq_Len, d_k) --> (batch, Seq_Len, h, d_k) --> (batch, Seq_Len, d_model)
        x = x.transpose(1, 2).contiguous().view(x.shape[0], -1, self.h * self.d_k)
        return self.w_o(x)
```



</div>

</div>

---
layout: center

class: text-center
---

# 感谢观看

敬请师兄师姐批评指正
