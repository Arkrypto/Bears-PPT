import{d,i as p,a as _,u,b as h,c as m,e as f,f as l,g as t,t as a,h as n,F as g,r as v,n as x,j as y,o as r,k as b,l as N,m as P,p as k,q as w,_ as S}from"./index-0a6527b0.js";import{N as T}from"./NoteDisplay-5830e95d.js";const V={class:"m-4"},j={class:"mb-10"},B={class:"text-4xl font-bold mt-2"},L={class:"opacity-50"},C={class:"text-lg"},D={class:"font-bold flex gap-2"},F={class:"opacity-50"},H={key:0,class:"border-gray-400/50 mb-8"},z=d({__name:"PresenterPrint",setup(E){p(_),u(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),h({title:`Notes - ${m.title}`});const i=f(()=>y.slice(0,-1).map(o=>{var s;return(s=o.meta)==null?void 0:s.slide}).filter(o=>o!==void 0&&o.noteHTML!==""));return(o,s)=>(r(),l("div",{id:"page-root",style:x(n(w))},[t("div",V,[t("div",j,[t("h1",B,a(n(m).title),1),t("div",L,a(new Date().toLocaleString()),1)]),(r(!0),l(g,null,v(n(i),(e,c)=>(r(),l("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",C,[t("div",D,[t("div",F,a(e==null?void 0:e.no)+"/"+a(n(b)),1),N(" "+a(e==null?void 0:e.title)+" ",1),s[0]||(s[0]=t("div",{class:"flex-auto"},null,-1))])]),P(T,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<n(i).length-1?(r(),l("hr",H)):k("v-if",!0)]))),128))])],4))}}),q=S(z,[["__file","E:/File/Repo/cur/Bears-PPT/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{q as default};
