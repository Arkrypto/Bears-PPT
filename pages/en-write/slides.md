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

## 周四 5~6 节基础写作第 2 组汇报 — Methodology & Disscussion

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    成员：符莹、熊舟桐、张翼帆、周思达
    <!--<carbon:arrow-right class="inline"/>-->
  </span>
</div>









<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit/>
  </button>
  <a href="https://github.com/Arkrypto" target="_blank" alt="GitHub"
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

# GraphSPD

GraphSPD: Graph-Based Security Patch Detection with Enriched Code Semantics

在方法论部分，论文介绍了GraphSPD的主要构建框架和流程。这一部分的写作强调了以下几个要素

- **a.** **问题定义与目标设定**
- **b.** **图模型构建**
- **c.** **图神经网络（GNN）的应用**
- **d.** **代码语义的丰富化**

<br>

<img style="height:40%;clear:both;margin:auto" src="/en-write/image-20241218202347976.png">

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

## 方案 - Methodology

<br>

| **段意**           | **内容**                                                     | **写作技巧**                                                 |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 问题定义和目标设定 | 论文首先定义了目标任务，即如何通过自动化方法识别和分析代码中的安全漏洞补丁。作者清晰地提出了方法的核心目标是**安全补丁检测**，并描述了此任务在代码审查和漏洞修复中的重要性 | 作者通过明确的问题定义，让读者一开始就能了解论文的核心目标是什么。这里的写作技巧是从实际的应用需求出发，强调问题的实际意义和紧迫性 |
| 图模型构建         | 作者提出通过图模型来表达代码中的结构和语义。程序代码被建模为图，其中每个代码片段（如函数、类、语句等）都被视为图中的节点，而节点之间的控制流和数据流关系则表示为图中的边。这样做的优点在于，可以捕捉到代码中复杂的依赖关系，有助于捕获潜在的漏洞信息 | 通过这种形式化的表达（图结构的建模），论文清晰地阐述了GraphSPD方法的创新性。在技术细节方面，论文使用了图神经网络（GNN）作为推理引擎，这是当前在图数据分析领域非常流行且有效的技术，展示了研究的前沿性 |

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

*续上表 👆*

| **段意**         | **内容**                                                     | **写作技巧**                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| GNN 的应用       | 论文的核心创新在于通过图神经网络来学习代码的结构化特征，并利用这些特征来判断代码中的漏洞和补丁。作者详细描述了使用的具体GNN架构，以及如何通过节点和边的特征来训练模型 | 论文通过逐步引导的方式，详细描述了如何将GNN应用于代码图的训练和推理过程中，使得技术内容不显得过于晦涩。每个环节的连接都逻辑清晰，逐步展开，让读者能够理解每个技术选择背后的动机 |
| 代码语义的丰富化 | 作者提到，通过结合更丰富的代码语义信息（例如：函数调用信息、数据流依赖关系等），他们的模型能够比传统的静态分析方法更好地识别潜在的安全漏洞 | 该部分通过对比传统方法与新方法的差异，突出其优势。同时，作者也展示了如何从多个层次（如函数调用、数据流分析等）提取代码语义，避免了单一维度的局限性 |



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

## 讨论 - Disscussion

在讨论部分，作者深入探讨了GraphSPD方法的潜力与局限性，并提出了未来的研究方向。这部分内容包括

1. 方法优势与贡献总结
2. 局限性分析
3. 未来的研究方向
4. 与现有工作对比

<br>

| **段意**           | **内容**                                                     | **写作技巧**                                                 |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 方法优势与贡献总结 | 作者总结了GraphSPD方法相对于其他漏洞检测方法的优势。例如，基于图的建模方式能更好地捕捉代码的复杂结构，结合GNN的学习能力，使得模型能够识别出更多潜在的安全问题 | 总结方法的贡献时，作者通过对比现有技术的不足，强调了GraphSPD在实际应用中的优越性。这种写作方式帮助读者从更高的角度理解论文的意义，尤其是在应用领域的影响 |

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

| **段意**       | **内容**                                                     | **写作技巧**                                                 |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 局限性分析     | 作者也坦诚地分析了GraphSPD方法的局限性，例如：图的构建可能会因为代码的复杂性而导致计算复杂度的增加，GNN模型的训练可能需要大量的数据支持等 | 通过对局限性的客观分析，作者增强了论文的可信度和学术严谨性。讨论局限性时，作者没有回避问题，而是给出了具体的解释和可能的解决方案，这为未来的研究提供了方向 |
| 未来的研究方向 | 在讨论部分，作者也提出了未来的研究方向，例如进一步提高模型的可扩展性、探索如何处理更复杂的代码结构、结合更多类型的安全检测等。这一部分体现了作者的前瞻性思维，展示了方法的长远发展潜力 | 提出未来的研究方向时，作者不仅仅停留在理论层面，还结合了实际的挑战和需求。这种写作方式不仅展示了论文的深度，也为后续研究提供了具体的指导 |
| 与现有工作对比 | 论文还讨论了与其他研究方法的对比，包括静态分析、动态分析以及基于机器学习的方法。通过对比，作者指出了GraphSPD的独特性和改进之处 | 这种对比分析帮助读者理解论文工作与现有方法的区别，尤其是通过阐明GraphSPD如何解决现有方法中的不足，增强了其创新性和学术价值 |

---


# DragDiffusion

DragDiffusion: Harnessing Diffusion Models for Interactive Point-based Image Editing

“DragDiffusion” 提出了一种基于扩散模型的交互式图像编辑方法，主要包含三个关键步骤：**① 身份保持微调 ② 扩散潜在变量优化和 ③ 参考潜在变量控制的去噪**

<img style="height:70%;clear:both;margin:auto" src="/en-write/image-20241218205202278.png">

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

## 方案 - Methodology

***一、身份保持微调***

在对真实图像进行编辑之前，确保扩散UNet能够更准确地对输入图像的特征进行编码，从而在编辑过程中保持图像的身份一致性。使用LoRA技术。通过特定的目标函数来优化，这个目标函数涉及到真实图像、随机噪声以及扩散噪声调度的相关参数等，通过对LoRA参数进行梯度下降优化来实现

***二、扩散潜在变量优化***

1、获取初始值：首先对给定的真实图像应用DDIM反演，得到某一步的扩散潜在变量作为初始值。 

2、优化过程：**① 运动监督**：定义运动监督损失，这个损失考虑了UNet输出的特征图以及未被掩码区域的正则化。在每次迭代中，通过梯度下降的方式更新潜在变量，以最小化这个损失。其中涉及到一些概念，比如某一次更新后的潜在变量、停止梯度算子等；**② 点跟踪**：由于运动监督会导致手柄点的位置发生变化，所以需要使用UNet的特征图来进行点跟踪。具体是通过在特定区域内进行最近邻搜索，来更新每个手柄点

***三、参考潜在变量控制的去噪***

在UNet的自注意力模块进行前向传播时，将优化后的潜在变量所生成的键值替换为原始潜在变量生成的键值。这样优化后的潜在变量查询向量就能够关联到原始潜在变量的内容和纹理，从而提高编辑结果与原始图像的一致性

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

# Radar

Fast, Efficient, and Viable Compressed Sensing, Low-Rank, and Robust Principle Component Analysis Algorithms for Radar Signal Processing

<div grid="~ cols-2 gap-0">

<div>

论文提出了快速、高效且实用的雷达信号处理算法，算法主要包括

- **① 压缩感知**
- **② 低秩**
- **③ 鲁棒主成分分析**

<br>

<img src="/en-write/image-20241218225636601.png">

</div>

<div>

<img style="margin-top:9px;height:97%" src="/en-write/image-20241218225113838.png">





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

## 方案 - Methodology

<br>

| **关键词**                               | **释义**                                                     | **论文贡献**                                                 |
| ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 压缩感知（Compressed Sensing）           | 压缩感知是一种用于信号恢复的技术，可在采样率低于传统奈氏定理的情况下恢复信号，减少信号采集和处理的计算量 | 论文提出了TST（Turbo Shrinkage Thresholding）算法，结合了低秩结构与鲁棒性，能够更有效地恢复雷达信号。通过优化问题的解法，降低了计算复杂度，提高了信号恢复的效率和准确性 |
| 仿射秩最小化（Affine Rank Minimization） | 低秩矩阵恢复是指通过对低秩矩阵的学习和恢复来处理信号数据     | 作者提出了一种基于低秩矩阵恢复的新算法——TSVT（Turbo Singular Value Thresholding）算法，通过结合稀疏性和低秩性来解决信号恢复问题。在该方法中，低秩矩阵被用于建模雷达信号的相关结构，从而使得在采样不足的情况下也能恢复出高质量的信号 |

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

*续上表 👆*

| **关键词**                                                   | **释义**                                                     | **论文贡献**                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 压缩鲁棒主成分分析（Compressed Robust Principal Component Analysis） | 结合了上述CS和ARM问题的算法，提出了的TCRPCA（Turbo Compressed Robust Principal Component Analysis）算法 | TCRPCA算法分为两部分：第一部分提供凸解，第二部分通过CSCSA和CSRA进行精细化，以提高重建性能。其中，CSRA（Complex Smoothed Rank Approximation）算法，作为TSVT的精细化步骤，以提高重建性能 |

<br>

## 总结 - Conclusions

论文中的方法论部分详细介绍了算法的数学模型、优化问题和迭代过程，这些算法旨在解决雷达信号处理中的稀疏和低秩矩阵恢复问题。通过结合多个算法，使得论文方案能够在保持快速收敛和低计算复杂度的同时，提供高重建性能

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

敬请批评指正
