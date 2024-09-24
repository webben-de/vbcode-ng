import{c as z}from"./chunk-2222FEZL.js";import"./chunk-777X4XMN.js";import{a as N}from"./chunk-NYA4DLT2.js";import{a as q,b as R}from"./chunk-X3YUAQHH.js";import{b as M,c as b}from"./chunk-2CH4XR4M.js";import{a as I}from"./chunk-ZNAIGONW.js";import{a as $}from"./chunk-GXIAPNSE.js";import"./chunk-UWZUNSGB.js";import{l as L,p as V,u as w,x as h}from"./chunk-UFIXWNDQ.js";import{Db as c,Ib as u,Jb as O,Lb as D,Mb as P,Na as G,Nb as i,Ob as o,Pb as C,Wb as x,fc as r,gc as s,hb as n,hc as S,ic as k,jd as T,la as F,nc as A,oc as j,pc as B,ra as g,rc as y,vc as E,xc as v,yb as d,yc as f}from"./chunk-4E5X34BO.js";import"./chunk-SECEFDB3.js";import{f as K,g as U}from"./chunk-GAL4ENT6.js";var J=K(N());var X=(e,a,t)=>[e,a,"details",t],Y=(e,a,t)=>[e,a,t];function Z(e,a){e&1&&(i(0,"div",3),r(1,"upcomming"),o())}function ee(e,a){if(e&1&&(i(0,"p",4),r(1),o()),e&2){x();let t=B(2);n(),k("",t.result_home," - ",t.result_away,"")}}function te(e,a){e&1&&(i(0,"div",6),r(1),v(2,"transloco"),o()),e&2&&(n(),s(f(2,1,"finished")))}function ne(e,a){if(e&1&&(i(0,"a",7)(1,"mat-icon"),r(2,"edit"),o()()),e&2){let t=x(),m=B(2);c("routerLink",E(1,Y,t.ROUTES.root,t.ROUTES.editGame,m.id))}}var H=(()=>{class e{ROUTES=I;event=G.required();currentDate=new Date;session=w(h.session);static \u0275fac=function(m){return new(m||e)};static \u0275cmp=g({type:e,selectors:[["app-event-card"]],inputs:{event:[1,"event"]},standalone:!0,features:[y],decls:16,vars:15,consts:[[1,"card","bg-base-100","w-96","shadow-xl"],[1,"card-body"],[1,"card-title","text-sm","truncate",3,"routerLink"],[1,"badge","badge-secondary"],[1,"bg-green"],[1,"card-actions","justify-end"],[1,"badge","badge-outline"],[1,"btn","btn-primary","btn-xs",3,"routerLink"]],template:function(m,l){if(m&1&&(i(0,"div",0)(1,"div",1),A(2),i(3,"span",2),r(4),d(5,Z,2,0,"div",3),i(6,"div",3),r(7),o()(),i(8,"p"),r(9),o(),d(10,ee,2,2,"p",4),i(11,"div",5),d(12,te,3,3,"div",6),i(13,"div",6),r(14),o(),d(15,ne,3,5,"a",7),o()()()),m&2){let _;n(2);let p=j(l.event());n(),c("routerLink",E(11,X,l.ROUTES.root,l.ROUTES.report,p.id)),n(),S(" ",p.title," "),n(),u(p.date>l.currentDate?5:-1),n(2),s(p.date),n(2),k("",p.home_team.name," vs ",(p.away_team==null?null:p.away_team.name)||"TBD",""),n(),u(p.result_home&&p.result_away?10:-1),n(2),u(p.result_home&&p.result_away?12:-1),n(2),s(p.visibility),n(),u(p.owner===((_=l.session())==null||_.user==null?null:_.user.id)?15:-1)}},dependencies:[T,V,L,R,q,b,M],styles:["[_nghost-%COMP%]{display:block}"]})}return e})();var ie=(e,a,t)=>[e,a,t];function oe(e,a){if(e&1&&C(0,"app-event-card",4),e&2){let t=a.$implicit;c("event",t)}}function ae(e,a){if(e&1&&C(0,"app-event-card",4),e&2){let t=a.$implicit;c("event",t)}}function re(e,a){if(e&1&&(i(0,"a",5),r(1),v(2,"transloco"),o()),e&2){let t=x();c("routerLink",E(4,ie,t.ROUTES.root,t.ROUTES.games,t.ROUTES.create)),n(),S(" ",f(2,2,"create-a-new-game")," ")}}var Oe=(()=>{class e{upcomingEvents={upcomming:[],past:[]};session=w(h.session);currentDate=new Date;eventsService=F($);events=this.eventsService.getEvents();ROUTES=I;ngOnInit(){return U(this,null,function*(){let t=yield this.events;this.upcomingEvents=(0,J.groupBy)(t,m=>new Date(m.date)>this.currentDate?"upcomming":"past"),console.log(this.upcomingEvents)})}static \u0275fac=function(m){return new(m||e)};static \u0275cmp=g({type:e,selectors:[["app-game-list-page"]],hostAttrs:[1,"flex","flex-col","p-5"],standalone:!0,features:[y],decls:18,vars:10,consts:[[1,"text-2xl","font-bold"],[1,"flex","flex-col","gap-4"],[1,"text-lg"],[1,"flex","md:flex-row","gap-4"],[3,"event"],[1,"btn","btn-secondary",3,"routerLink"]],template:function(m,l){if(m&1&&(i(0,"span",0),r(1),v(2,"transloco"),o(),i(3,"div",1)(4,"div",2),r(5),v(6,"transloco"),o(),i(7,"div",3),D(8,oe,1,1,"app-event-card",4,O),o(),C(10,"hr"),i(11,"div",2),r(12),v(13,"transloco"),o(),i(14,"div",3),D(15,ae,1,1,"app-event-card",4,O),o(),d(17,re,3,8,"a",5),o()),m&2){let _;n(),s(f(2,4,"your-events")),n(4),s(f(6,6,"upcomming-events")),n(3),P(l.upcomingEvents.upcomming),n(4),s(f(13,8,"past-events")),n(3),P(l.upcomingEvents.past),n(2),u((_=l.session())!=null&&_.user?17:-1)}},dependencies:[z,T,L,R,b,M,H],encapsulation:2})}return e})();export{Oe as GamesListPageComponent};
