import{c as B}from"./chunk-UGZOGAZK.js";import{a as h,b as k}from"./chunk-YU4S6PZZ.js";import{b as P,c as R}from"./chunk-XZP47TVV.js";import{a as M}from"./chunk-ZNAIGONW.js";import{a as U}from"./chunk-G7BHBRZZ.js";import"./chunk-HW5RURNN.js";import{l as F,u as G,x as O}from"./chunk-KXY5KEB2.js";import{Db as _,Ib as p,Jb as y,Lb as T,Mb as L,Nb as o,Ob as a,Wb as c,ed as w,gc as r,hb as n,hc as d,ic as v,id as I,jc as S,la as C,ra as E,rc as b,vc as f,wc as u,xc as x,yb as s}from"./chunk-4UK4RW6P.js";import"./chunk-SECEFDB3.js";import"./chunk-GAL4ENT6.js";var $=(e,l,i)=>[e,l,"details",i],D=(e,l,i)=>[e,l,i];function j(e,l){e&1&&(o(0,"div",6),r(1,"upcomming"),a())}function A(e,l){if(e&1&&(o(0,"p",7),r(1),a()),e&2){let i=c().$implicit;n(),S("",i.result_home," - ",i.result_away,"")}}function q(e,l){e&1&&(o(0,"div",9),r(1),u(2,"transloco"),a()),e&2&&(n(),d(x(2,1,"finished")))}function z(e,l){if(e&1&&(o(0,"a",10)(1,"mat-icon"),r(2,"edit"),a()()),e&2){let i=c().$implicit,t=c();_("routerLink",f(1,D,t.ROUTES.root,t.ROUTES.editGame,i.id))}}function H(e,l){if(e&1&&(o(0,"div",2)(1,"div",4)(2,"span",5),r(3),s(4,j,2,0,"div",6),o(5,"div",6),r(6),a()(),o(7,"p"),r(8),a(),s(9,A,2,2,"p",7),o(10,"div",8),s(11,q,3,3,"div",9),o(12,"div",9),r(13),a(),s(14,z,3,5,"a",10),a()()()),e&2){let i,t=l.$implicit,m=c();n(2),_("routerLink",f(10,$,m.ROUTES.root,m.ROUTES.report,t.id)),n(),v(" ",t.title," "),n(),p(t.date>m.currentDate?4:-1),n(2),d(t.date),n(2),S("",t.home_team.name," vs ",(t.away_team==null?null:t.away_team.name)||"TBD",""),n(),p(t.result_home&&t.result_away?9:-1),n(2),p(t.result_home&&t.result_away?11:-1),n(2),d(t.visibility),n(),p(t.owner===((i=m.session())==null||i.user==null?null:i.user.id)?14:-1)}}function J(e,l){if(e&1&&(o(0,"a",3),r(1),u(2,"transloco"),a()),e&2){let i=c();_("routerLink",f(4,D,i.ROUTES.root,i.ROUTES.games,i.ROUTES.create)),n(),v(" ",x(2,2,"create-a-new-game")," ")}}var le=(()=>{class e{session=G(O.session);currentDate=new Date;eventsService=C(U);events=this.eventsService.getEvents();ROUTES=M;static \u0275fac=function(t){return new(t||e)};static \u0275cmp=E({type:e,selectors:[["app-game-list-page"]],hostAttrs:[1,"flex","flex-col","p-5"],standalone:!0,features:[b],decls:8,vars:6,consts:[[1,"text-2xl","font-bold"],[1,"flex","flex-col","md:flex-row","items-center","gap-4"],[1,"card","bg-base-100","w-96","shadow-xl"],[1,"btn","btn-secondary",3,"routerLink"],[1,"card-body"],[1,"card-title","text-sm","truncate",3,"routerLink"],[1,"badge","badge-secondary"],[1,"bg-green"],[1,"card-actions","justify-end"],[1,"badge","badge-outline"],[1,"btn","btn-primary","btn-xs",3,"routerLink"]],template:function(t,m){if(t&1&&(o(0,"span",0),r(1),u(2,"transloco"),a(),o(3,"div",1),T(4,H,15,14,"div",2,y),u(6,"async"),s(7,J,3,8,"a",3),a()),t&2){let g;n(),d(x(2,2,"your-events")),n(3),L(x(6,4,m.events)),n(3),p((g=m.session())!=null&&g.user?7:-1)}},dependencies:[B,I,w,F,k,h,R,P],encapsulation:2})}return e})();export{le as GamesListPageComponent};