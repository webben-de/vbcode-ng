import{a as te,b as ie}from"./chunk-R3GIKCAV.js";import{a as W}from"./chunk-VFP2DDOR.js";import{b as ee}from"./chunk-OL4CWCSQ.js";import{a as X,e as Y}from"./chunk-BEXHPWTT.js";import{f as V,g as H,h as F,j as f,l as j,o as z,p as K,s as Z,t as $}from"./chunk-55CRI4HG.js";import"./chunk-3ACIU7HM.js";import{a as L}from"./chunk-4R3SIY6Y.js";import{a as U}from"./chunk-ZNAIGONW.js";import{c as g}from"./chunk-AC5BHCOO.js";import{a as J}from"./chunk-6U7GO4WO.js";import{W as Q}from"./chunk-4VPFC4IH.js";import{D as q,l as T,p as P}from"./chunk-A6DT7CBD.js";import{Db as v,Jb as G,Lb as I,Mb as D,Nb as i,Ob as t,Pb as E,fc as n,fd as N,hb as l,hc as p,jd as R,ma as S,rc as O,sa as C,va as M,vc as b,xc as r,yc as d,zc as c}from"./chunk-ZDK7RG5R.js";import"./chunk-SECEFDB3.js";import{i as u}from"./chunk-GK2WYAVW.js";var ne=(()=>{let a=class a{transform(s,m){if(s)return s.filter(e=>e.kind===m)}};a.\u0275fac=function(m){return new(m||a)},a.\u0275pipe=M({name:"kindFilter",type:a,pure:!0,standalone:!0});let o=a;return o})();var re=(o,a,h)=>[o,a,"details",h];function le(o,a){if(o&1&&(i(0,"mat-option",4),n(1),t()),o&2){let h=a.$implicit;v("value",h.id),l(),p(" ",h.title," ")}}var Me=(()=>{let a=class a{constructor(){this.ROUTES=U,this.supabase=S(q),this.actionsService=S(W),this.eventsService=S(J),this.events=this.eventsService.getEvents(),this.hits=[],this.kinds=g,this.gameF=new F({game_id:new f(""),game_set:new f("Alle")}),this.pieChartDist={series:[]},this.newGameF=new F({title:new f(""),date:new f(new Date)}),this.setCountOptionOfGame=[1]}ngOnInit(){return u(this,null,function*(){this.events=this.eventsService.getEvents();let s=(yield this.events)[0].id;if(!s)return;this.gameF.controls.game_id.setValue(s),this.actions=this.actionsService.getActionsOfEvent(s),yield this.refreshHits();let m=[{name:"Attack",value:(yield this.actions).filter(e=>e.kind===g.Attack).length}];this.pieChartDist.series=m,this.gameF.controls.game_id.valueChanges.subscribe(e=>u(this,null,function*(){this.actions=this.actionsService.getActionsOfEvent(e||""),yield this.refreshHits()}))})}refreshHits(){return u(this,null,function*(){this.hits=(yield this.actions)?.filter(s=>s.kind===g.Attack)})}createNewGame(){return u(this,null,function*(){yield this.eventsService.createEvent(this.newGameF.value),this.newGameF.reset()})}};a.\u0275fac=function(m){return new(m||a)},a.\u0275cmp=C({type:a,selectors:[["app-gameview"]],standalone:!0,features:[O],decls:75,vars:52,consts:[[1,"flex","flex-col","max-w-full","overflow-hidden"],[1,"flex","gap-8","p-5"],[1,"flex","gap-4",3,"formGroup"],["formControlName","game_id"],["selected","",3,"value"],["placeholder","Satz","formControlName","game_set",3,"value"],["value","Alle"],["value","1"],[1,"flex","w-full","justify-between","p-5"],[1,"stats","stats-vertical","shadow","w-1/2"],[1,"stat"],[1,"stat-title"],[1,"stat-value","text-secondary"],[1,"btn",3,"routerLink"],["echarts","",1,"h-40","w-full",3,"options"]],template:function(m,e){if(m&1&&(i(0,"div",0)(1,"div",1)(2,"form",2)(3,"mat-form-field")(4,"mat-label"),n(5,"Game:"),t(),i(6,"mat-select",3),I(7,le,2,2,"mat-option",4,G),r(9,"async"),t()(),i(10,"mat-form-field")(11,"mat-label"),n(12,"Satz:"),t(),i(13,"mat-select",5)(14,"mat-option",6),n(15,"Alle"),t(),i(16,"mat-option",7),n(17," 1 "),t()()()()(),E(18,"hr"),i(19,"div",8)(20,"div",9)(21,"div",10)(22,"div",11),n(23,"Angriffe"),t(),i(24,"div",12),n(25),r(26,"async"),r(27,"kindFilter"),t()(),i(28,"div",10)(29,"div",11),n(30,"Aufschl\xE4ge"),t(),i(31,"div",12),n(32),r(33,"async"),r(34,"kindFilter"),t()(),i(35,"div",10)(36,"div",11),n(37,"Annahme"),t(),i(38,"div",12),n(39),r(40,"async"),r(41,"kindFilter"),t()()(),i(42,"div",9)(43,"div",10)(44,"div",11),n(45,"Blocks"),t(),i(46,"div",12),n(47),r(48,"async"),r(49,"kindFilter"),t()(),i(50,"div",10)(51,"div",11),n(52,"Zuspiele"),t(),i(53,"div",12),n(54),r(55,"async"),r(56,"kindFilter"),t()(),i(57,"div",10)(58,"div",11),n(59,"Defense"),t(),i(60,"div",12),n(61),r(62,"async"),r(63,"kindFilter"),t()(),i(64,"div",10)(65,"div",11),n(66,"FreeBall"),t(),i(67,"div",12),n(68),r(69,"async"),r(70,"kindFilter"),t()()()(),i(71,"a",13),n(72,"Details"),t(),E(73,"div",14)(74,"hr"),t()),m&2){let k,w,y,_,x,B,A;l(2),v("formGroup",e.gameF),l(5),D(d(9,11,e.events)),l(6),v("value","Alle"),l(12),p(" ",(k=c(27,15,d(26,13,e.actions),e.kinds.Attack))==null?null:k.length," "),l(7),p(" ",(w=c(34,20,d(33,18,e.actions),e.kinds.Serve))==null?null:w.length," "),l(7),p(" ",(y=c(41,25,d(40,23,e.actions),e.kinds.Recieve))==null?null:y.length," "),l(8),p(" ",(_=c(49,30,d(48,28,e.actions),e.kinds.Block))==null?null:_.length," "),l(7),p(" ",(x=c(56,35,d(55,33,e.actions),e.kinds.Set))==null?null:x.length," "),l(7),p(" ",(B=c(63,40,d(62,38,e.actions),e.kinds.Def))==null?null:B.length," "),l(7),p(" ",(A=c(70,45,d(69,43,e.actions),e.kinds.Free))==null?null:A.length," "),l(3),v("routerLink",b(48,re,e.ROUTES.root,e.ROUTES.report,e.gameF.controls.game_id.value)),l(2),v("options",e.pieChartDist)}},dependencies:[P,T,R,N,ne,Y,ee,X,L,Z,j,V,H,$,z,K,ie,te,Q],encapsulation:2});let o=a;return o})();export{Me as GameViewComponent};
