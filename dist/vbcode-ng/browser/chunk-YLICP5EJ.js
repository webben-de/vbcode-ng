import{a as x}from"./chunk-7RSQF7ZA.js";import{b as A}from"./chunk-4CSFT2EN.js";import{b as k,d as B}from"./chunk-RAVLFMPR.js";import"./chunk-RPOIAFM2.js";import{a as v}from"./chunk-TCJH5OWT.js";import{a as h}from"./chunk-HIBICU2U.js";import"./chunk-D622VEOF.js";import"./chunk-S7MLKT2B.js";import"./chunk-VKAWOJXU.js";import"./chunk-KBJD7QSN.js";import{a as C}from"./chunk-MXE2HHVD.js";import{a as F}from"./chunk-NYA4DLT2.js";import{a as b,b as K}from"./chunk-3JUEVKZF.js";import"./chunk-VZPJVAJY.js";import{i as y,l as g,p as M}from"./chunk-GBB5DFIW.js";import{Db as o,Nb as a,Ob as r,Pb as m,fc as p,gc as c,hb as e,hd as f,la as d,qc as u,ra as s,rc as l}from"./chunk-H7CKKUTN.js";import{f as D}from"./chunk-GAL4ENT6.js";var P=D(F());var I=()=>["..","..",".."],J=(()=>{class i{kindMap=A;route=d(y);actions=[];kind=v.UNKNOWN;groupedByKind=[];groupedByPlayer=[];groupedByGrade=[];update(){this.groupedByKind=Object.entries((0,P.groupBy)(this.actions,"kind"))}ngOnInit(){this.actions=this.route.snapshot.data.actions,this.kind=this.route.snapshot.paramMap.get("kind"),this.update()}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=s({type:i,selectors:[["app-report-kind-detail-page"]],hostAttrs:[1,"flex","flex-col","gap-4","p-5","relative"],standalone:!0,features:[u],decls:10,vars:7,consts:[[1,"flex"],["mat-fab","",1,"btn","fixed","bottom-2","left-1"],[3,"routerLink"],[1,"text-lg"],[3,"actions","groupedByKind"],[3,"actions"]],template:function(n,t){n&1&&(a(0,"div",0)(1,"button",1)(2,"a",2)(3,"mat-icon"),p(4,"arrow_back_ios"),r()()()(),a(5,"span",3),p(6),r(),m(7,"app-action-by-kind",4)(8,"app-actions-by-player",5)(9,"app-actions-by-grade",5)),n&2&&(e(2),o("routerLink",l(6,I)),e(4),c(t.kindMap.get(t.kind)),e(),o("actions",t.actions)("groupedByKind",t.groupedByKind),e(),o("actions",t.actions),e(),o("actions",t.actions))},dependencies:[f,x,C,h,M,g,K,b,B,k],styles:["[_nghost-%COMP%]{display:flex}"]})}return i})();export{J as ReportKindDetailPageComponent};
