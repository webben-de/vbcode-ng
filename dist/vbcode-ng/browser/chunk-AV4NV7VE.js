import{a as S}from"./chunk-2C25I5X4.js";import{a as T,b as A}from"./chunk-6WVPEPCM.js";import{a as D}from"./chunk-PUIBGWJ5.js";import{b as _}from"./chunk-AOFIJYTA.js";import"./chunk-BCCPXHBQ.js";import"./chunk-JBTEI3DZ.js";import"./chunk-XNXORNOT.js";import{b,c as B,f as P}from"./chunk-LYPYQBPW.js";import"./chunk-Z7MTC7CX.js";import"./chunk-ZNAIGONW.js";import"./chunk-AC5BHCOO.js";import"./chunk-KWBS3G3M.js";import"./chunk-ZV26CFN4.js";import{i as k,p as M}from"./chunk-EHXDS3RM.js";import{Ab as C,Ac as y,Fb as l,Kb as m,Pb as n,Qb as o,Rb as s,Yb as d,hc as c,jb as i,kc as f,ld as v,na as h,ta as x,tc as g,zc as u}from"./chunk-OIJTL5GY.js";import"./chunk-SECEFDB3.js";import"./chunk-GK2WYAVW.js";function I(t,e){if(t&1&&(n(0,"span"),c(1),u(2,"transloco"),o()),t&2){let a=d();i(),f("",y(2,2,"filtered-type"),": ",a.kindMap.get(a.kind),"")}}function R(t,e){if(t&1&&(n(0,"span"),c(1),u(2,"transloco"),o()),t&2){let a=d();i(),f("",y(2,2,"from")," ",a.player.name,"")}}var U=(()=>{let e=class e{constructor(){this.route=h(k),this.actions=[],this.player=this.route.snapshot.data.player,this.kind=this.route.snapshot.params.kind,this.kindMap=_}ngOnInit(){this.actions=this.route.snapshot.data.actions}};e.\u0275fac=function(p){return new(p||e)},e.\u0275cmp=x({type:e,selectors:[["app-report-player-detail-page"]],hostAttrs:[1,"flex","flex-col","gap-4","p-5","relative"],standalone:!0,features:[g],decls:9,vars:4,consts:[[1,"flex","w-full","justify-between"],[1,"flex","gap-2"],[3,"actions"]],template:function(p,r){p&1&&(n(0,"div",0),s(1,"app-detail-page-back-button")(2,"app-detail-breadcrumbs"),o(),s(3,"br"),n(4,"p",1),C(5,I,3,4,"span")(6,R,3,4,"span"),o(),s(7,"app-actions-by-grade",2)(8,"app-actions-by-kind",2)),p&2&&(i(5),m(r.kind?5:-1),i(),m(r.player?6:-1),i(),l("actions",r.actions),i(),l("actions",r.actions))},dependencies:[v,S,M,P,A,B,b,D,T],styles:["[_nghost-%COMP%]{display:block}"]});let t=e;return t})();export{U as ReportPlayerDetailPageComponent};