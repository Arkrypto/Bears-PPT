import{d as _,i as d,a as p,u as h,b as u,c as m,e as f,f as n,g as t,t as s,h as a,F as g,r as v,n as x,j as y,o as l,k as b,l as N,m as P,p as k,q as w,_ as S}from"./index-af2cc1f5.js";import{N as T}from"./NoteDisplay-8c92b6b0.js";const V={class:"m-4"},j={class:"mb-10"},B={class:"text-4xl font-bold mt-2"},L={class:"opacity-50"},C={class:"text-lg"},D={class:"font-bold flex gap-2"},F={class:"opacity-50"},H=t("div",{class:"flex-auto"},null,-1),z={key:0,class:"border-gray-400/50 mb-8"},E=_({__name:"PresenterPrint",setup(M){d(p),h(`
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
`),u({title:`Notes - ${m.title}`});const i=f(()=>y.slice(0,-1).map(o=>{var r;return(r=o.meta)==null?void 0:r.slide}).filter(o=>o!==void 0&&o.noteHTML!==""));return(o,r)=>(l(),n("div",{id:"page-root",style:x(a(w))},[t("div",V,[t("div",j,[t("h1",B,s(a(m).title),1),t("div",L,s(new Date().toLocaleString()),1)]),(l(!0),n(g,null,v(a(i),(e,c)=>(l(),n("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",C,[t("div",D,[t("div",F,s(e==null?void 0:e.no)+"/"+s(a(b)),1),N(" "+s(e==null?void 0:e.title)+" ",1),H])]),P(T,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<a(i).length-1?(l(),n("hr",z)):k("v-if",!0)]))),128))])],4))}}),A=S(E,[["__file","E:/File/Repo/cur/Bears-PPT/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{A as default};
