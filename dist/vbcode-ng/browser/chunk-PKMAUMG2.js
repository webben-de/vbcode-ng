import{a as Se}from"./chunk-C47NCUMU.js";import{a as se}from"./chunk-6QGPKB27.js";import{a as pe,b as me}from"./chunk-SHADY5E3.js";import{a as k}from"./chunk-ZNAIGONW.js";import{a as K}from"./chunk-2MIAU5CH.js";import{a as re,e as ne,f as oe}from"./chunk-ADS45SPD.js";import{a as le}from"./chunk-EB5KWZCQ.js";import"./chunk-UGQI2ENJ.js";import{h as ee}from"./chunk-FZ3NCQG6.js";import"./chunk-3ACIU7HM.js";import"./chunk-SECEFDB3.js";import{a as Me,b as he,c as ve,d as _e}from"./chunk-VFMQ4K25.js";import{a as ue,b as u,c as ye,d as fe,e as ge}from"./chunk-VTB6F652.js";import{b as ie,d as ae}from"./chunk-RAVLFMPR.js";import{a as de,b as ce}from"./chunk-TP3PO2IB.js";import{a as X,b as Y,c as Z}from"./chunk-6RIYRAXF.js";import"./chunk-RPOIAFM2.js";import{a as e,b as D,c as s}from"./chunk-AC5BHCOO.js";import{V as te}from"./chunk-VZPJVAJY.js";import{i as W,k as q,l as J,p as Q}from"./chunk-EWYTQ76Z.js";import{Ba as b,Ca as M,Da as V,Db as f,Ea as j,Ib as H,Jb as C,Lb as x,Mb as A,Na as z,Nb as n,Ob as o,Pb as v,Rb as E,Ub as S,Wb as P,ed as $,fc as d,gc as B,hb as p,hc as O,hd as T,la as c,qc as R,ra as w,uc as L,vc as G,wc as N,xc as U,yb as I}from"./chunk-H7CKKUTN.js";import{f as be,g as y}from"./chunk-GAL4ENT6.js";var m=be(Me());var F={[s.UNKNOWN]:{title:"Recieve",total:0,by_player:new Map,stats:{[e["#"]]:0,[e["+"]]:0,[e["!"]]:0,[e["/"]]:0,[e["-"]]:0,[e["="]]:0}},[s.Serve]:{title:"Serve",total:0,by_player:new Map,stats:{[e["#"]]:0,[e["+"]]:0,[e["!"]]:0,[e["/"]]:0,[e["-"]]:0,[e["="]]:0}},[s.Recieve]:{title:"Recieve",total:0,by_player:new Map,stats:{[e["#"]]:0,[e["+"]]:0,[e["!"]]:0,[e["/"]]:0,[e["-"]]:0,[e["="]]:0}},[s.Attack]:{total:0,by_player:new Map,stats:{[e["#"]]:0,[e["+"]]:0,[e["!"]]:0,[e["/"]]:0,[e["-"]]:0,[e["="]]:0}},[s.Block]:{total:0,by_player:new Map,stats:{[e["#"]]:0,[e["+"]]:0,[e["!"]]:0,[e["/"]]:0,[e["-"]]:0,[e["="]]:0}},[s.Def]:{total:0,by_player:new Map,stats:{[e["#"]]:0,[e["+"]]:0,[e["!"]]:0,[e["/"]]:0,[e["-"]]:0,[e["="]]:0}},[s.Set]:{total:0,by_player:new Map,stats:{[e["#"]]:0,[e["+"]]:0,[e["!"]]:0,[e["/"]]:0,[e["-"]]:0,[e["="]]:0}},[s.Free]:{total:0,by_player:new Map,stats:{[e["#"]]:0,[e["+"]]:0,[e["!"]]:0,[e["/"]]:0,[e["-"]]:0,[e["="]]:0}}};function xe(r,g){if(r&1){let t=E();n(0,"li"),v(1,"hr"),n(2,"div",2),d(3),G(4,"date"),o(),n(5,"div",3),V(),n(6,"svg",4),v(7,"path",5),o()(),j(),n(8,"details",6)(9,"summary",7),d(10),o(),n(11,"ul",8)(12,"li")(13,"a",9),S("click",function(){let i=b(t).$implicit,h=P();return M(h.deleteAction(i.id))}),d(14,"Delete"),o()()()(),v(15,"hr"),o()}if(r&2){let t=g.$implicit;p(3),B(U(4,2,t.created_at,"short")),p(7),B(t==null||t.player_id==null?null:t.player_id.name)}}var Be=(()=>{class r{actionsService=c(K);actions=z.required();deleteAction(t){return y(this,null,function*(){return yield this.actionsService.deleteAction(t)})}static \u0275fac=function(a){return new(a||r)};static \u0275cmp=w({type:r,selectors:[["app-action-horizontal-timeline"]],inputs:{actions:[1,"actions"]},standalone:!0,features:[R],decls:4,vars:0,consts:[[1,"p-8","flex","max-w-full","overflow-x-scroll"],[1,"timeline"],[1,"timeline-start"],[1,"timeline-middle"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor",1,"h-5","w-5"],["fill-rule","evenodd","d","M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z","clip-rule","evenodd"],[1,"dropdown"],[1,"timeline-end","timeline-box"],[1,"menu","dropdown-content","bg-base-100","rounded-box","z-[1]","w-52","p-2","shadow"],[3,"click"]],template:function(a,i){a&1&&(n(0,"section",0)(1,"ul",1),x(2,xe,16,5,"li",null,C),o()()),a&2&&(p(2),A(i.actions()))},dependencies:[T,$],styles:["[_nghost-%COMP%]{display:block}"]})}return r})();var Ae=(r,g,t)=>[r,g,t];function Ee(r,g){if(r&1){let t=E();n(0,"button",13),S("click",function(){b(t);let i=P();return M(i.deleteEvent(i.game.id))}),n(1,"mat-icon"),d(2,"delete"),o()()}}function Pe(r,g){if(r&1&&(n(0,"mat-option",8),d(1),o()),r&2){let t=g.$implicit;f("value",t),p(),O(" ",t," ")}}var ht=(()=>{class r{ROUTES=k;export(){return y(this,null,function*(){})}activatedRoute=c(W);supabase=c(ee);actionsService=c(K);eventService=c(le);router=c(q);snack=c(se);currentSet;stats=F;kindS=ge;charts={perfectGradeRadar:{},worstGradeRadar:{}};grad_options_list=ue.map(t=>t.name);game;actions=[];gradePie={};playerPie={};sets=[1];hintMap=Se;groupedByKind=[];groupedByGrade=[];groupedByKindByPlayer;groupedByKindByGrade=[];groupedByKindByGradeAndPlayer;groupedByPlayer=[];gradDescriptionMap=u;groupedByGradeByKind;ngOnInit(){this.activatedRoute.data.subscribe(i=>y(this,[i],function*({game:t,actions:a}){let h=a;yield this.updateStats(a,t),this.sets=Array.from(new Set(h.map(_=>_.game_set)))})),this.actionsService.actions$.subscribe(t=>{this.reloadSet(this.currentSet)})}updateStats(t,a){return y(this,null,function*(){this.game=a,this.actions=t,this.groupedByPlayer=(0,m.sortBy)(Object.entries((0,m.groupBy)(t,"player_id.name")),i=>i[1]).reverse(),this.groupedByKind=Object.entries((0,m.groupBy)(t,"kind")),this.groupedByGrade=(0,m.sortBy)(Object.entries((0,m.groupBy)(t,"grade")),i=>ye.get(i[0])||0),this.groupedByKindByPlayer=this.groupedByKind.map(i=>[i[0],(0,m.countBy)(i[1],"player_id.name")]),this.groupedByKindByGrade=this.groupedByKind.map(i=>[i[0],(0,m.countBy)(i[1],"grade")]),this.groupedByGradeByKind=this.groupedByGrade.map(i=>[i[0],(0,m.countBy)(i[1],"kind")]),this.groupedByKindByGradeAndPlayer=Object.entries((0,m.groupBy)(t,i=>`${i.kind}_${i.player_id?.name}`)).map(i=>[i[0],(0,m.groupBy)(i[1],"grade")]),this.generateGradeRadar()})}generateGradeRadar(t=this.actions){let a=t.filter(l=>l.grade===e["#"]),i=t.filter(l=>l.grade===e["="]),h=(0,m.countBy)(a,"kind"),_=this.groupedByGradeByKind.map(l=>({value:[l[1][s.Attack],l[1][s.Block],l[1][s.Def],l[1][s.Free],l[1][s.Recieve],l[1][s.Serve],l[1][s.Set]],name:u.get(l[0]),lineStyle:{color:D.get(l[0])},itemStyle:{color:D.get(l[0])}})),we=(0,m.countBy)(i,"kind");this.charts.perfectGradeRadar={title:{text:"Perfect/Failures ",show:!1},legend:{data:[u.get(e["#"]),u.get(e["!"]),u.get(e["+"]),u.get(e["/"]),u.get(e["-"]),u.get(e["="])]},radar:{indicator:fe.map(l=>({name:this.kindS.get(l.abbr),max:Math.max(...Object.values(h),...Object.values(we))}))},series:[{name:"Perfect vs Worst",type:"radar",data:[..._]}]}}convertPlayerCountMapToArray(t){return Array.from(t.entries()).sort((a,i)=>i[1]-a[1])}updateCharts(t){this.stats[t].charts||(this.stats[t].charts={gradePie:{},playerPie:{}}),this.stats[t].charts.gradePie={series:[]},this.stats[t].charts.gradePie.series=[{type:"pie",radius:"50%",data:Object.entries(this.stats[t].stats).map(a=>({value:a[1],name:a[0]}))}],this.stats[t].charts.playerPie={series:[]},this.stats[t].charts.playerPie.series=[{type:"pie",radius:"50%",data:Object.entries(this.stats[t].by_player).map(a=>({value:a[1],name:a[0]}))}]}reloadSet(t){return y(this,null,function*(){this.currentSet=t,this.game?.id&&(!t||t==="Alle"?this.actions=yield this.actionsService.getActionsOfEvent(this.game.id):this.actions=yield this.actionsService.getActionsOfEventOfSet(this.game.id,t),this.stats=F,this.updateStats(this.actions,this.game))})}deleteEvent(t){return y(this,null,function*(){try{yield this.eventService.deleteEvent(t),this.router.navigate([k.root,k.games])}catch{this.snack.open(X("error-deleteing-event"))}})}static \u0275fac=function(a){return new(a||r)};static \u0275cmp=w({type:r,selectors:[["app-game-game-detail-view"]],hostAttrs:[1,"flex","flex-col","p-5","gap-4"],standalone:!0,features:[R],decls:22,vars:18,consts:[[1,"flex","justify-between","items-center"],[1,"!text-sm","font-medium","truncate"],[1,"fixed","bottom-2","right-2","flex","flex-col","gap-2"],["mat-fab","",3,"routerLink"],["mat-fab",""],["id","export",1,"flex","flex-col","gap-8"],["formControlName","game_set",3,"valueChange","value"],["value","Alle"],[3,"value"],[3,"actions","groupedByKind"],[3,"actions","groupedByGrade"],[3,"actions","groupedByPlayer"],[3,"actions"],["mat-fab","",3,"click"]],template:function(a,i){a&1&&(n(0,"div",0)(1,"h1",1),d(2),o(),n(3,"div",2)(4,"button",3)(5,"mat-icon"),d(6,"add"),o()(),I(7,Ee,3,0,"button",4),o()(),n(8,"div",5)(9,"mat-form-field")(10,"mat-label"),d(11),G(12,"transloco"),o(),n(13,"mat-select",6),S("valueChange",function(_){return i.reloadSet(_)}),n(14,"mat-option",7),d(15,"Alle"),o(),x(16,Pe,2,2,"mat-option",8,C),o()(),v(18,"app-action-by-kind",9)(19,"app-actions-by-grade",10)(20,"app-actions-by-player",11)(21,"app-action-horizontal-timeline",12),o()),a&2&&(p(2),B(i.game.title),p(2),f("routerLink",L(14,Ae,i.ROUTES.root,i.ROUTES.dataentry,i.game.id)),p(3),H(i.game.owner&&i.game.id?7:-1),p(4),O("",N(12,12,"set"),":"),p(2),f("value","Alle"),p(3),A(i.sets),p(2),f("actions",i.actions)("groupedByKind",i.groupedByKind),p(),f("actions",i.actions)("groupedByGrade",i.groupedByGrade),p(),f("actions",i.actions)("groupedByPlayer",i.groupedByPlayer),p(),f("actions",i.actions))},dependencies:[he,ve,_e,Be,T,Q,J,oe,ne,re,me,pe,te,ae,ie,ce,de,Z,Y],encapsulation:2})}return r})();export{ht as ReportDetailViewComponent};
