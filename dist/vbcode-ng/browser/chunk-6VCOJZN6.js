import{a as kt,b as wt}from"./chunk-4MBNRNX6.js";import{b as mt,c as dt}from"./chunk-2AZUBS73.js";import{a as pt}from"./chunk-ZNAIGONW.js";import{H as A,O as vt,P as Z,R as ft,T as xt,b as q,l as w,m as _t,q as bt,r as ut}from"./chunk-SM3423AC.js";import{A as gt,l as lt,p as rt,x as ht}from"./chunk-C73UPVXY.js";import{$b as Q,B as G,Ca as W,Da as Y,Db as L,Eb as T,Ga as S,Gb as I,Jb as f,Ma as P,Oa as J,Ob as r,Pa as y,Pb as d,Qb as $,Sb as tt,Va as B,Vb as it,Xb as M,Yb as N,Zb as g,_b as x,a as X,ac as _,bc as b,gc as p,ha as O,hc as z,ib as l,ic as et,ja as j,jb as s,jc as V,kd as D,ma as K,oc as at,pc as ct,qc as U,rc as nt,sa as u,sc as k,ta as E,ua as h,vb as C,wc as H,yc as ot,zb as v,zc as st}from"./chunk-VMVCLMWB.js";var It=(i,t,m)=>[i,t,"details",m],At=(i,t,m)=>[i,t,m];function Ot(i,t){i&1&&(r(0,"div",3),p(1,"upcomming"),d())}function Et(i,t){if(i&1&&(r(0,"p",4),p(1),d()),i&2){M();let m=U(2);l(),V("",m.result_home," - ",m.result_away,"")}}function St(i,t){i&1&&(r(0,"div",6),p(1),ot(2,"transloco"),d()),i&2&&(l(),z(st(2,1,"finished")))}function Tt(i,t){if(i&1&&(r(0,"a",7)(1,"mat-icon"),p(2,"edit"),d()()),i&2){let m=M(),e=U(2);T("routerLink",H(1,At,m.ROUTES.root,m.ROUTES.editGame,e.id))}}var ni=(()=>{class i{ROUTES=pt;event=J.required();currentDate=new Date;session=ht(gt.session);static \u0275fac=function(e){return new(e||i)};static \u0275cmp=u({type:i,selectors:[["app-event-card"]],inputs:{event:[1,"event"]},standalone:!0,features:[k],decls:16,vars:15,consts:[[1,"card","bg-base-100","w-96","shadow-xl"],[1,"card-body"],[1,"card-title","text-sm","truncate",3,"routerLink"],[1,"badge","badge-secondary"],[1,"bg-green"],[1,"card-actions","justify-end"],[1,"badge","badge-outline"],[1,"btn","btn-primary","btn-xs",3,"routerLink"]],template:function(e,a){if(e&1&&(r(0,"div",0)(1,"div",1),at(2),r(3,"span",2),p(4),v(5,Ot,2,0,"div",3),r(6,"div",3),p(7),d()(),r(8,"p"),p(9),d(),v(10,Et,2,2,"p",4),r(11,"div",5),v(12,St,3,3,"div",6),r(13,"div",6),p(14),d(),v(15,Tt,3,5,"a",7),d()()()),e&2){let c;l(2);let n=ct(a.event());l(),T("routerLink",H(11,It,a.ROUTES.root,a.ROUTES.report,n.id)),l(),et(" ",n.title," "),l(),f(n.date>a.currentDate?5:-1),l(2),z(n.date),l(2),V("",n.home_team.name," vs ",(n.away_team==null?null:n.away_team.name)||"TBD",""),l(),f(n.result_home&&n.result_away?10:-1),l(2),f(n.result_home&&n.result_away?12:-1),l(2),z(n.visibility),l(),f(n.owner===((c=a.session())==null||c.user==null?null:c.user.id)?15:-1)}},dependencies:[D,rt,lt,wt,kt,dt,mt],styles:["[_nghost-%COMP%]{display:block}"]})}return i})();var Ct=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=E({type:t}),t.\u0275inj=O({imports:[A,A]});let i=t;return i})();var zt=["*"],Dt='.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer;padding-left:16px;padding-right:16px;background-color:var(--mdc-list-list-item-container-color);border-radius:var(--mdc-list-list-item-container-shape, var(--mat-app-corner-none))}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item:focus{outline:0}.mdc-list-item.mdc-list-item--disabled{cursor:auto}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--selected::before,.mdc-list-item.mdc-list-item--selected:focus::before,.mdc-list-item:not(.mdc-list-item--selected):focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.cdk-high-contrast-active .mdc-list-item.mdc-list-item--selected::before,.cdk-high-contrast-active .mdc-list-item.mdc-list-item--selected:focus::before,.cdk-high-contrast-active .mdc-list-item:not(.mdc-list-item--selected):focus::before{border-color:CanvasText}.mdc-list-item.mdc-list-item--selected:focus::before,.mdc-list-item.mdc-list-item--selected::before{border-width:3px;border-style:double}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color, var(--mat-app-on-surface-variant));width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size);margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size);margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item--with-leading-avatar .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font, var(--mat-app-label-small-font));line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height, var(--mat-app-label-small-line-height));font-size:var(--mdc-list-list-item-trailing-supporting-text-size, var(--mat-app-label-small-size));font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight, var(--mat-app-label-small-weight));letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking, var(--mat-app-label-small-tracking))}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color, var(--mat-app-on-surface-variant));width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color, var(--mat-app-on-surface-variant))}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color, var(--mat-app-primary))}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:var(--mdc-list-list-item-label-text-color, var(--mat-app-on-surface));font-family:var(--mdc-list-list-item-label-text-font, var(--mat-app-body-large-font));line-height:var(--mdc-list-list-item-label-text-line-height, var(--mat-app-body-large-line-height));font-size:var(--mdc-list-list-item-label-text-size, var(--mat-app-body-large-size));font-weight:var(--mdc-list-list-item-label-text-weight, var(--mat-app-body-large-weight));letter-spacing:var(--mdc-list-list-item-label-text-tracking, var(--mat-app-body-large-tracking))}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color, var(--mat-app-on-surface))}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color, var(--mat-app-on-surface))}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;color:var(--mdc-list-list-item-supporting-text-color, var(--mat-app-on-surface-variant));font-family:var(--mdc-list-list-item-supporting-text-font, var(--mat-app-body-medium-font));line-height:var(--mdc-list-list-item-supporting-text-line-height, var(--mat-app-body-medium-line-height));font-size:var(--mdc-list-list-item-supporting-text-size, var(--mat-app-body-medium-size));font-weight:var(--mdc-list-list-item-supporting-text-weight, var(--mat-app-body-medium-weight));letter-spacing:var(--mdc-list-list-item-supporting-text-tracking, var(--mat-app-body-medium-tracking))}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:16px}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:16px;padding-right:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-trailing-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:0;padding-right:0}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-webkit-user-select:none;user-select:none;margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;line-height:normal;align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-left:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-right:0}.mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-group__subheader{margin:.75rem 16px}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color, var(--mat-app-on-surface));opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color, var(--mat-app-on-surface));opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing,[dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing{padding-left:0;padding-right:0}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color, var(--mat-app-on-surface))}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color, var(--mat-app-on-surface));opacity:var(--mdc-list-list-item-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity))}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color, var(--mat-app-on-surface));opacity:var(--mdc-list-list-item-disabled-state-layer-opacity, var(--mat-app-focus-state-layer-opacity))}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color, var(--mat-app-on-surface));opacity:var(--mdc-list-list-item-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity))}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape, var(--mat-app-corner-full));background-color:var(--mdc-list-list-item-leading-avatar-color, var(--mat-app-primary-container))}.mat-mdc-list-item-icon{font-size:var(--mdc-list-list-item-leading-icon-size)}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:"";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:""}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:start}mat-action-list button::-moz-focus-inner{border:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-inline-start:var(--mat-list-list-item-leading-icon-start-space);margin-inline-end:var(--mat-list-list-item-leading-icon-end-space)}.mat-mdc-nav-list .mat-mdc-list-item{border-radius:var(--mat-list-active-indicator-shape, var(--mat-app-corner-full));--mat-mdc-focus-indicator-border-radius:var(--mat-list-active-indicator-shape, var(--mat-app-corner-full))}.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated{background-color:var(--mat-list-active-indicator-color, var(--mat-app-secondary-container))}',Ft=["unscopedContent"],Rt=["text"],jt=[[["","matListItemAvatar",""],["","matListItemIcon",""]],[["","matListItemTitle",""]],[["","matListItemLine",""]],"*",[["","matListItemMeta",""]],[["mat-divider"]]],Pt=["[matListItemAvatar],[matListItemIcon]","[matListItemTitle]","[matListItemLine]","*","[matListItemMeta]","mat-divider"];var Bt=new j("ListOption"),Nt=(()=>{let t=class t{constructor(e){this._elementRef=e}};t.\u0275fac=function(a){return new(a||t)(s(y))},t.\u0275dir=h({type:t,selectors:[["","matListItemTitle",""]],hostAttrs:[1,"mat-mdc-list-item-title","mdc-list-item__primary-text"],standalone:!0});let i=t;return i})(),Qt=(()=>{let t=class t{constructor(e){this._elementRef=e}};t.\u0275fac=function(a){return new(a||t)(s(y))},t.\u0275dir=h({type:t,selectors:[["","matListItemLine",""]],hostAttrs:[1,"mat-mdc-list-item-line","mdc-list-item__secondary-text"],standalone:!0});let i=t;return i})(),Vt=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275dir=h({type:t,selectors:[["","matListItemMeta",""]],hostAttrs:[1,"mat-mdc-list-item-meta","mdc-list-item__end"],standalone:!0});let i=t;return i})(),Lt=(()=>{let t=class t{constructor(e){this._listOption=e}_isAlignedAtStart(){return!this._listOption||this._listOption?._getTogglePosition()==="after"}};t.\u0275fac=function(a){return new(a||t)(s(Bt,8))},t.\u0275dir=h({type:t,hostVars:4,hostBindings:function(a,c){a&2&&I("mdc-list-item__start",c._isAlignedAtStart())("mdc-list-item__end",!c._isAlignedAtStart())},standalone:!0});let i=t;return i})(),Ut=(()=>{let t=class t extends Lt{};t.\u0275fac=(()=>{let e;return function(c){return(e||(e=S(t)))(c||t)}})(),t.\u0275dir=h({type:t,selectors:[["","matListItemAvatar",""]],hostAttrs:[1,"mat-mdc-list-item-avatar"],standalone:!0,features:[C]});let i=t;return i})(),Ht=(()=>{let t=class t extends Lt{};t.\u0275fac=(()=>{let e;return function(c){return(e||(e=S(t)))(c||t)}})(),t.\u0275dir=h({type:t,selectors:[["","matListItemIcon",""]],hostAttrs:[1,"mat-mdc-list-item-icon"],standalone:!0,features:[C]});let i=t;return i})(),qt=new j("MAT_LIST_CONFIG"),F=(()=>{let t=class t{constructor(){this._isNonInteractive=!0,this._disableRipple=!1,this._disabled=!1,this._defaultOptions=K(qt,{optional:!0})}get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=w(e)}get disabled(){return this._disabled}set disabled(e){this._disabled=w(e)}};t.\u0275fac=function(a){return new(a||t)},t.\u0275dir=h({type:t,hostVars:1,hostBindings:function(a,c){a&2&&L("aria-disabled",c.disabled)},inputs:{disableRipple:"disableRipple",disabled:"disabled"},standalone:!0});let i=t;return i})(),Zt=(()=>{let t=class t{set lines(e){this._explicitLines=_t(e,null),this._updateItemLines(!1)}get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(e){this._disableRipple=w(e)}get disabled(){return this._disabled||!!this._listBase?.disabled}set disabled(e){this._disabled=w(e)}get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(e,a,c,n,o,R){this._elementRef=e,this._ngZone=a,this._listBase=c,this._platform=n,this._explicitLines=null,this._disableRipple=!1,this._disabled=!1,this._subscriptions=new X,this._rippleRenderer=null,this._hasUnscopedTextContent=!1,this.rippleConfig=o||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()==="button",this._noopAnimations=R==="NoopAnimations",c&&!c._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute("type")&&this._hostElement.setAttribute("type","button")}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(!0)}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents()}_hasIconOrAvatar(){return!!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add("mat-mdc-list-item-interactive"),this._rippleRenderer=new vt(this,this._ngZone,this._hostElement,this._platform),this._rippleRenderer.setupTriggerEvents(this._hostElement)}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(G(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(!1)))})}_updateItemLines(e){if(!this._lines||!this._titles||!this._unscopedContent)return;e&&this._checkDomForUnscopedTextContent();let a=this._explicitLines??this._inferLinesFromContent(),c=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle("mat-mdc-list-item-single-line",a<=1),this._hostElement.classList.toggle("mdc-list-item--with-one-line",a<=1),this._hostElement.classList.toggle("mdc-list-item--with-two-lines",a===2),this._hostElement.classList.toggle("mdc-list-item--with-three-lines",a===3),this._hasUnscopedTextContent){let n=this._titles.length===0&&a===1;c.classList.toggle("mdc-list-item__primary-text",n),c.classList.toggle("mdc-list-item__secondary-text",!n)}else c.classList.remove("mdc-list-item__primary-text"),c.classList.remove("mdc-list-item__secondary-text")}_inferLinesFromContent(){let e=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(e+=1),e}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(e=>e.nodeType!==e.COMMENT_NODE).some(e=>!!(e.textContent&&e.textContent.trim()))}};t.\u0275fac=function(a){return new(a||t)(s(y),s(P),s(F,8),s(q),s(Z,8),s(B,8))},t.\u0275dir=h({type:t,contentQueries:function(a,c,n){if(a&1&&(x(n,Ut,4),x(n,Ht,4)),a&2){let o;_(o=b())&&(c._avatars=o),_(o=b())&&(c._icons=o)}},hostVars:4,hostBindings:function(a,c){a&2&&(L("aria-disabled",c.disabled)("disabled",c._isButtonElement&&c.disabled||null),I("mdc-list-item--disabled",c.disabled))},inputs:{lines:"lines",disableRipple:"disableRipple",disabled:"disabled"},standalone:!0});let i=t;return i})();var ji=(()=>{let t=class t extends F{};t.\u0275fac=(()=>{let e;return function(c){return(e||(e=S(t)))(c||t)}})(),t.\u0275cmp=u({type:t,selectors:[["mat-list"]],hostAttrs:[1,"mat-mdc-list","mat-mdc-list-base","mdc-list"],exportAs:["matList"],standalone:!0,features:[nt([{provide:F,useExisting:t}]),C,k],ngContentSelectors:zt,decls:1,vars:0,template:function(a,c){a&1&&(N(),g(0))},styles:[Dt],encapsulation:2,changeDetection:0});let i=t;return i})(),Pi=(()=>{let t=class t extends Zt{get activated(){return this._activated}set activated(e){this._activated=w(e)}constructor(e,a,c,n,o,R){super(e,a,c,n,o,R),this._activated=!1}_getAriaCurrent(){return this._hostElement.nodeName==="A"&&this._activated?"page":null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}};t.\u0275fac=function(a){return new(a||t)(s(y),s(P),s(F,8),s(q),s(Z,8),s(B,8))},t.\u0275cmp=u({type:t,selectors:[["mat-list-item"],["a","mat-list-item",""],["button","mat-list-item",""]],contentQueries:function(a,c,n){if(a&1&&(x(n,Qt,5),x(n,Nt,5),x(n,Vt,5)),a&2){let o;_(o=b())&&(c._lines=o),_(o=b())&&(c._titles=o),_(o=b())&&(c._meta=o)}},viewQuery:function(a,c){if(a&1&&(Q(Ft,5),Q(Rt,5)),a&2){let n;_(n=b())&&(c._unscopedContent=n.first),_(n=b())&&(c._itemText=n.first)}},hostAttrs:[1,"mat-mdc-list-item","mdc-list-item"],hostVars:13,hostBindings:function(a,c){a&2&&(L("aria-current",c._getAriaCurrent()),I("mdc-list-item--activated",c.activated)("mdc-list-item--with-leading-avatar",c._avatars.length!==0)("mdc-list-item--with-leading-icon",c._icons.length!==0)("mdc-list-item--with-trailing-meta",c._meta.length!==0)("mat-mdc-list-item-both-leading-and-trailing",c._hasBothLeadingAndTrailing())("_mat-animation-noopable",c._noopAnimations))},inputs:{activated:"activated"},exportAs:["matListItem"],standalone:!0,features:[C,k],ngContentSelectors:Pt,decls:10,vars:0,consts:[["unscopedContent",""],[1,"mdc-list-item__content"],[1,"mat-mdc-list-item-unscoped-content",3,"cdkObserveContent"],[1,"mat-mdc-focus-indicator"]],template:function(a,c){if(a&1){let n=tt();N(jt),g(0),r(1,"span",1),g(2,1),g(3,2),r(4,"span",2,0),it("cdkObserveContent",function(){return W(n),Y(c._updateItemLines(!0))}),g(6,3),d()(),g(7,4),g(8,5),$(9,"div",3)}},dependencies:[bt],encapsulation:2,changeDetection:0});let i=t;return i})();var Bi=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=E({type:t}),t.\u0275inj=O({imports:[ut,D,A,ft,xt,Ct]});let i=t;return i})();export{ni as a,ji as b,Pi as c,Bi as d};
