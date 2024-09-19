import{a as Te}from"./chunk-FEZXCYEF.js";import{a as he,b as Ee}from"./chunk-TBHJXHKI.js";import{a as Me}from"./chunk-P6APD5KV.js";import{a as pe}from"./chunk-S2KG2YW5.js";import{a as Se,d as ge,e as we}from"./chunk-T5TLMUG5.js";import{b as ie,c as ne}from"./chunk-XZP47TVV.js";import{a as N,b as V}from"./chunk-GAECJW6X.js";import{a as oe}from"./chunk-ZNAIGONW.js";import{a as Fe,b as xe}from"./chunk-ZPJ6EFHG.js";import{a as P,b as ye,e as R,f as k}from"./chunk-JZT7ZK4K.js";import{a as le}from"./chunk-G7BHBRZZ.js";import{b as se,d as G,f as b,g as de,h as K,j as o,l as ce,m as ue,n as fe,na as B,o as ve,p as _e,q as Ce,s as O,t as I}from"./chunk-HW5RURNN.js";import{i as Y,k as Z,l as ee,p as te,u as ae,x as re,y as me}from"./chunk-KXY5KEB2.js";import"./chunk-3ACIU7HM.js";import{Ba as q,Ca as U,Db as s,Ib as h,Jb as _,Lb as C,Mb as S,Na as w,Nb as a,Ob as i,Pb as f,Rb as z,Ub as H,Wb as $,bd as Q,ec as E,ed as W,gc as r,hb as t,hc as u,ic as F,id as X,jc as J,la as v,ra as x,rc as M,sc as T,uc as j,wc as d,xc as c,yb as y}from"./chunk-4UK4RW6P.js";import"./chunk-SECEFDB3.js";import{g as L}from"./chunk-GAL4ENT6.js";function Ne(e,p){if(e&1&&(a(0,"mat-option",1),r(1),i()),e&2){let n=p.$implicit;s("value",n==null?null:n.id),t(),J(" ",n==null?null:n.trikot," - ",n==null?null:n.name," ")}}var Ge=(()=>{class e{index=w.required();createGameForm=w.required();attendeesOptions=w.required();static \u0275fac=function(m){return new(m||e)};static \u0275cmp=x({type:e,selectors:[["app-single-roation-form-control"]],hostAttrs:[1,"flex","flex-col"],inputs:{index:[1,"index"],createGameForm:[1,"createGameForm"],attendeesOptions:[1,"attendeesOptions"]},standalone:!0,features:[M],decls:6,vars:2,consts:[[3,"formControl"],[3,"value"]],template:function(m,l){m&1&&(a(0,"mat-form-field")(1,"mat-label"),r(2),i(),a(3,"mat-select",0),C(4,Ne,2,3,"mat-option",1,_),i()()),m&2&&(t(2),u(l.index()),t(),s("formControl",l.createGameForm().controls[l.index()]),t(),S(l.attendeesOptions()))},dependencies:[k,R,P,V,N,B,O,b,I,fe],encapsulation:2})}return e})();var Ve=()=>["Private","Public"],be=(e,p)=>[e,p],Oe=()=>[4,3,2,5,6,1];function Ae(e,p){if(e&1&&(a(0,"mat-option",15),r(1),i()),e&2){let n=p.$implicit;s("value",n),t(),F(" ",n," ")}}function De(e,p){if(e&1&&(a(0,"mat-option",15),r(1),i()),e&2){let n=p.$implicit;s("value",n.id),t(),F(" ",n.name," ")}}function Le(e,p){if(e&1&&f(0,"app-single-roation-form-control",23),e&2){let n=p.$implicit,m=$(2);s("attendeesOptions",m.attendeesOptions)("index",n)("createGameForm",m.createGameForm.controls.home_team_start_rotation)}}function qe(e,p){e&1&&(a(0,"span",21),r(1),d(2,"transloco"),i(),a(3,"div",22),C(4,Le,1,3,"app-single-roation-form-control",23,_),i()),e&2&&(t(),u(c(2,1,"start-rotation")),t(3),S(T(3,Oe)))}function Ue(e,p){if(e&1&&(a(0,"mat-option",15),r(1),i()),e&2){let n=p.$implicit;s("value",n.id),t(),F(" ",n.name," ")}}function He(e,p){if(e&1&&f(0,"app-single-roation-form-control",23),e&2){let n=p.$implicit,m=$(2);s("attendeesOptions",m.attendeesOptions)("index",n)("createGameForm",m.createGameForm.controls.away_team_start_rotation)}}function $e(e,p){e&1&&(a(0,"span",21),r(1),d(2,"transloco"),i(),a(3,"div",22),C(4,He,1,3,"app-single-roation-form-control",23,_),i()),e&2&&(t(),u(c(2,1,"start-rotation")),t(3),S(T(3,Oe)))}function je(e,p){e&1&&(a(0,"div",19)(1,"div",24)(2,"mat-form-field",7)(3,"mat-label"),r(4,"Result Home "),i(),f(5,"input",25),i()(),a(6,"div",24)(7,"mat-form-field",7)(8,"mat-label"),r(9,"Result Away "),i(),f(10,"input",26),i()()())}var Et=(()=>{class e{ROUTES=oe;route=v(Y);router=v(Z);snack=v(we);eventsService=v(le);supabase=v(me);playerService=v(Me);teamService=v(pe);session=ae(re.session);teams=this.teamService.getTeams();players=this.playerService.getPlayers();attendeesOptions=[];createGameForm=new K({id:new o(void 0),title:new o("",G.required),date:new o(new Date,G.required),attendees:new o([]),result_home:new o(void 0),result_away:new o(void 0),home_team:new o(void 0),home_team_start_rotation:new K({1:new o(null),2:new o(null),3:new o(null),4:new o(null),5:new o(null),6:new o(null)}),away_team_start_rotation:new Ce([new o(null),new o(null),new o(null),new o(null),new o(null),new o(null)]),away_team:new o(void 0),owner:new o(this.session().user.id,G.required),shared_with:new o([]),visibility:new o("Private")});createGame(){return L(this,null,function*(){let n=this.createGameForm.value;try{yield this.eventsService.createEvent(n),this.snack.open("Event create","open",{duration:5e3}).onAction().subscribe(()=>{})}catch(m){this.snack.open("Error creating Event:"+m,"OK",{duration:2e3})}})}OnHomeTeamChange(n){return L(this,null,function*(){if(!n)return;let m=yield this.teamService.getTeam(n);this.attendeesOptions=yield this.playerService.getPlayerList(m.players)})}ngOnInit(){this.route.data.subscribe(n=>{n.game&&this.createGameForm.patchValue(n.game),this.OnHomeTeamChange(this.createGameForm.controls.home_team.value)})}static \u0275fac=function(m){return new(m||e)};static \u0275cmp=x({type:e,selectors:[["app-create-game-page"]],standalone:!0,features:[M],decls:65,vars:51,consts:[["form",""],["homeTeam",""],["awayTeam",""],["eventFinished",""],[1,"flex","flex-col","items-start","gap-8","h-full","p-8"],[1,"text-2xl","font-bold"],[1,"flex","flex-col","w-full",3,"submit","formGroup"],[1,"w-full"],["matInput","","formControlName","title"],["formControlName","visibility"],[3,"value",4,"ngFor","ngForOf"],["matInput","","type","date","formControlName","date"],[3,"attendeesOptions","attendees"],[1,"text-lg"],["formControlName","home_team",3,"valueChange"],[3,"value"],[3,"routerLink"],[1,""],["formControlName","away_team"],[1,"flex","gap-2","w-full"],["mat-button","",3,"type"],[1,"text-md"],[1,"grid","grid-cols-3"],[3,"attendeesOptions","index","createGameForm"],[1,"w-1/2"],["matInput","","type","number","formControlName","result_home"],["matInput","","type","number","formControlName","result_away"]],template:function(m,l){if(m&1){let g=z();a(0,"div",4)(1,"span",5),r(2),d(3,"transloco"),i(),a(4,"form",6,0),H("submit",function(){return q(g),U(l.createGame())}),a(6,"mat-form-field",7)(7,"mat-label"),r(8),d(9,"transloco"),i(),f(10,"input",8),i(),a(11,"mat-form-field",7)(12,"mat-label"),r(13),d(14,"transloco"),i(),a(15,"mat-select",9),y(16,Ae,2,2,"mat-option",10),i()(),a(17,"mat-form-field",7)(18,"mat-label"),r(19),d(20,"transloco"),i(),f(21,"input",11),i(),f(22,"app-attendees-select-form-control",12)(23,"hr"),a(24,"span",13),r(25),d(26,"transloco"),i(),a(27,"mat-form-field",7)(28,"mat-label"),r(29),d(30,"transloco"),i(),a(31,"mat-select",14,1),H("valueChange",function(D){return q(g),U(l.OnHomeTeamChange(D))}),C(33,De,2,2,"mat-option",15,_),d(35,"async"),i(),a(36,"mat-hint")(37,"a",16),r(38),d(39,"transloco"),i()()(),y(40,qe,6,4),f(41,"hr"),a(42,"div",17)(43,"mat-form-field",7)(44,"mat-label"),r(45),d(46,"transloco"),i(),a(47,"mat-select",18,2),C(49,Ue,2,2,"mat-option",15,_),d(51,"async"),i()(),y(52,$e,6,4),i(),a(53,"mat-slide-toggle",null,3),r(55,"Event finished"),i(),y(56,je,11,0,"div",19),a(57,"button",20),r(58),d(59,"transloco"),i()(),f(60,"hr"),a(61,"p")(62,"a",16),r(63),d(64,"transloco"),i()()()}if(m&2){let g=E(32),A=E(48),D=E(54);t(2),u(c(3,20,"create-a-new-game")),t(2),s("formGroup",l.createGameForm),t(4),u(c(9,22,"title")),t(5),u(c(14,24,"visibility")),t(3),s("ngForOf",T(44,Ve)),t(3),u(c(20,26,"date")),t(3),s("attendeesOptions",l.attendeesOptions)("attendees",l.createGameForm.controls.attendees),t(3),u(c(26,28,"home")),t(4),u(c(30,30,"home-team")),t(4),S(c(35,32,l.teams)),t(4),s("routerLink",j(45,be,l.ROUTES.root+l.ROUTES.teams,g.value)),t(),F(" ",c(39,34,"edit-this-team")," "),t(2),h(g.value?40:-1),t(5),u(c(46,36,"away-team")),t(4),S(c(51,38,l.teams)),t(3),h(A.value?52:-1),t(4),h(D.checked||l.createGameForm.controls.result_home.value||l.createGameForm.controls.result_away.value?56:-1),t(),s("type","submit"),t(),u(c(59,40,"submit")),t(4),s("routerLink",j(48,be,l.ROUTES.root,l.ROUTES.games)),t(),u(c(64,42,"see-all-your-games-here"))}},dependencies:[k,R,P,ye,ge,Se,xe,Fe,O,ce,se,ue,b,de,I,ve,_e,Ee,he,V,N,B,X,Q,W,te,ee,ne,ie,Ge,Te],encapsulation:2})}return e})();export{Et as CreateGamePageComponent};
