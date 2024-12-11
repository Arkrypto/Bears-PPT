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

## 基础写作 02 组汇报



<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    组员：熊舟桐、符莹、张翼帆、周思达
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

# Fully Homomorphic Encryption Using Ideal Lattices

Lina Skora, Anna Marzecova, Gerhard Jocham; Brain Stimulation, 2024

**背景:**

- taVNS 是一种非侵入性方法，通过电刺激耳部迷走神经来影响大脑活动
- 瞳孔直径作为蓝斑去甲肾上腺素能活动的一个指标，受到交感和副交感神经系统的影响

**目的:**

- 探究不同模式的 taVNS 是否能够映射到去甲肾上腺素能系统的相位和张力模式
- 比较强直性（1秒）和阶段性（30秒开/关）taVNS 对瞳孔直径的影响

**设计**：单盲、假对照、交叉设计，在无任务状态下进行

**参与者**：多名健康志愿者

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

<div style="text-align:center">

# 总结

<p><center>"The effect of noninvasive vagus nerve stimulation on the baroreflex sensitivity and the pupil"</center></p>

</div>

非侵入迷走神经刺激对压力反射敏感性（baroreflex sensitivity）和瞳孔（pupil）的影响主要如下

- 对瞳孔反应的影响：强直性 taVNS (1秒)，引起瞳孔直径迅速增加，显著大于假刺激，并在刺激结束后迅速恢复到基线水平；阶段性 taVNS (30秒开/关)，同样引起瞳孔直径迅速增加，显著大于假刺激，尽管刺激持续，瞳孔直径在5秒内回到基线水平（效果类似于相位样 taVNS）
- 对于心率变异性（HRV），在时间域参数（如 SDNN、RMSSD、PNN50）在大多数研究中显示出显著变化，而在频率域参数（如 HF 功率、LF/HF 比值、LF 功率）的变化较少
- 对于压力反射敏感性，文中六项研究中仅一项检测到显著变化

结论：标准刺激参数下的 taVNS 更适合调制去甲肾上腺素能系统的强直活动，而非阶段活动；taVNS 对 HRV 的影响显著，尤其是在时间域参数方面，而对 BRS 的影响有限

</div>

---
layout: center

class: text-center
---

# 感谢观看

敬请批评指正
