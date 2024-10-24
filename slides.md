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

## A Survey on RFID and Mutual Authentication



<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    RFID/双向认证综述（2024.12.5）
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

# 超轻量协议

---
layout: iframe-left
url: https://ccf.atom.im/
---

哈哈哈

---

# 轻量协议

---
layout: image-right
image: /xdu.jpg
---



---

# 中量级协议



---

# 重量级协议


---

# 双向认证


---

<div style="width:80%;clear:both;margin:auto;margin-top:5%">

<div style="text-align:center">

# 总结

<p><center>A Survey on RFID and Mutual Authentication</center></p>

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
