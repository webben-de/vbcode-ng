import{a as Z}from"./chunk-XVY5HQIP.js";import{a as X,b as Y}from"./chunk-LGLWIYXC.js";import{a as ee,b as te}from"./chunk-MOHKEHQE.js";import{a as Q,b as W}from"./chunk-LCDHFVBT.js";import{a as H,e as J,f as K}from"./chunk-JJJ2N6CT.js";import{b as R,f as k,g as V,h as B,j as s,l as I,o as A,p as D,s as L,t as U}from"./chunk-AGHQT7XD.js";import"./chunk-3ACIU7HM.js";import{a as q,d as z}from"./chunk-SVIAZ3ZF.js";import{a as x}from"./chunk-ZNAIGONW.js";import{W as $,a as j}from"./chunk-SM3423AC.js";import{i as G,l as N,p as O}from"./chunk-C73UPVXY.js";import{Ca as S,Da as v,Eb as o,Ob as t,Pb as r,Qb as u,Sb as F,Vb as h,dd as w,gc as m,gd as E,ib as i,ic as C,kd as P,ma as l,sa as y,sc as g,uc as T,yc as _,zb as M,zc as b}from"./chunk-VMVCLMWB.js";import"./chunk-SECEFDB3.js";import{a as c,b as f,g as d}from"./chunk-GAL4ENT6.js";var ie=e=>[e];function oe(e,re){if(e&1&&(t(0,"mat-option",9),m(1),r()),e&2){let a=re.$implicit;o("value",a.id),i(),C(" ",a.name," ")}}var Ge=(()=>{class e{ROUTES=x;route=l(G);snack=l(X);teamsService=l(Z);playerService=l(j);players=this.playerService.getPlayers();team={};teamFormGroup=new B({id:new s(""),name:new s(""),players:new s([])});ngOnInit(){this.route.data.subscribe(a=>{this.team=a.team,this.team&&this.teamFormGroup.patchValue(f(c({},this.team),{players:this.team.players?this.team.players:[]}))})}createTeam(){return d(this,null,function*(){try{yield this.teamsService.createTeam(this.teamFormGroup.value)}catch{this.snack.open("Failed to create team","close",{duration:2e3})}})}static \u0275fac=function(p){return new(p||e)};static \u0275cmp=y({type:e,selectors:[["app-create-team-page"]],standalone:!0,features:[g],decls:21,vars:9,consts:[["form",""],[1,"flex","flex-col","items-start","gap-8","h-full","p-8"],[1,"flex","flex-col","w-full",3,"submit","formGroup"],[1,"w-full"],["matInput","","placeholder","Team name","formControlName","name"],["placeholder","Players","formControlName","players",3,"multiple"],[3,"value",4,"ngFor","ngForOf"],["mat-button","",3,"type"],[3,"routerLink"],[3,"value"]],template:function(p,n){if(p&1){let ae=F();t(0,"div",1)(1,"h2"),m(2,"Create a new Team"),r(),t(3,"form",2,0),h("submit",function(){return S(ae),v(n.createTeam())}),t(5,"mat-form-field",3)(6,"mat-label"),m(7,"Name"),r(),u(8,"input",4),r(),t(9,"mat-form-field",3)(10,"mat-label"),m(11,"Players"),r(),t(12,"mat-select",5),M(13,oe,2,2,"mat-option",6),_(14,"async"),r()(),t(15,"button",7),m(16,"Submit"),r()(),u(17,"hr"),t(18,"p")(19,"a",8),m(20,"See all your teams here"),r()()()}p&2&&(i(3),o("formGroup",n.teamFormGroup),i(9),o("multiple",!0),i(),o("ngForOf",b(14,5,n.players)),i(2),o("type","submit"),i(4),o("routerLink",T(7,ie,n.ROUTES.root+n.ROUTES.teams)))},dependencies:[K,J,H,z,q,W,Q,L,I,R,k,V,U,A,D,Y,te,ee,$,P,w,E,O,N],encapsulation:2})}return e})();export{Ge as CreateTeamPageComponent};
