import{q as se}from"./chunk-GTPAEQNT.js";import{$ as w,G as Z,K as q,Mc as D,V as Q,Y as X,ca as ee,g as J,h as W,ha as T,ia as te,jb as C,k as Y,ka as v,ma as L,na as ne,o as $,p as F,t as m,u as U,ua as ie,wa as re,xa as b,z as I}from"./chunk-EGQDYXLC.js";import{a as h,b as A,c as z}from"./chunk-GK2WYAVW.js";function ae(t){return t&&t.constructor&&typeof t.constructor.isBuffer=="function"&&t.constructor.isBuffer(t)}function oe(t){return t}function E(t,r){r=r||{};let e=r.delimiter||".",n=r.maxDepth,i=r.transformKey||oe,s={};function a(o,f,l){l=l||1,Object.keys(o).forEach(function(c){let u=o[c],d=r.safe&&Array.isArray(u),g=Object.prototype.toString.call(u),p=ae(u),N=g==="[object Object]"||g==="[object Array]",S=f?f+e+i(c):i(c);if(!d&&!p&&N&&Object.keys(u).length&&(!r.maxDepth||l<n))return a(u,S,l+1);s[S]=u})}return a(t),s}function _(t,r){r=r||{};let e=r.delimiter||".",n=r.overwrite||!1,i=r.transformKey||oe,s={};if(ae(t)||Object.prototype.toString.call(t)!=="[object Object]")return t;function o(c){let u=Number(c);return isNaN(u)||c.indexOf(".")!==-1||r.object?c:u}function f(c,u,d){return Object.keys(d).reduce(function(g,p){return g[c+e+p]=d[p],g},u)}function l(c){let u=Object.prototype.toString.call(c),d=u==="[object Array]",g=u==="[object Object]";if(c){if(d)return!c.length;if(g)return!Object.keys(c).length}else return!0}return t=Object.keys(t).reduce(function(c,u){let d=Object.prototype.toString.call(t[u]);return!(d==="[object Object]"||d==="[object Array]")||l(t[u])?(c[u]=t[u],c):f(u,c,E(t[u],r))},{}),Object.keys(t).forEach(function(c){let u=c.split(e).map(i),d=o(u.shift()),g=o(u[0]),p=s;for(;g!==void 0;){if(d==="__proto__")return;let N=Object.prototype.toString.call(p[d]),S=N==="[object Object]"||N==="[object Array]";if(!n&&!S&&typeof p[d]<"u")return;(n&&!S||!n&&p[d]==null)&&(p[d]=typeof g=="number"&&!r.object?[]:{}),p=p[d],u.length>0&&(d=o(u.shift()),g=o(u[0]))}p[d]=_(t[c],r)}),s}var V=class{translations;constructor(r){this.translations=r}getTranslation(r){return F(this.translations.get(r)||{})}},ue=new v("TRANSLOCO_LOADER");function x(t,r){return t&&(Object.prototype.hasOwnProperty.call(t,r)?t[r]:r.split(".").reduce((e,n)=>e?.[n],t))}function Te(t,r,e){t=h({},t);let n=r.split("."),i=n.length-1;return n.reduce((s,a,o)=>(o===i?s[a]=e:s[a]=Array.isArray(s[a])?s[a].slice():h({},s[a]),s&&s[a]),t),t}function fe(t){return t?Array.isArray(t)?t.length:G(t)?Object.keys(t).length:t?t.length:0:0}function Oe(t){return fe(t)===0}function Se(t){return typeof t=="function"}function j(t){return typeof t=="string"}function G(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function de(t){return t.replace(/(?:^\w|[A-Z]|\b\w)/g,(r,e)=>e==0?r.toLowerCase():r.toUpperCase()).replace(/\s+|_|-|\//g,"")}function K(t){return t==null}function ce(t){return K(t)===!1}function he(t){return t&&typeof t.scope=="string"}function Ae(t){return t&&G(t.loader)}function we(t){return _(t)}function le(t){return E(t,{safe:!0})}var O=new v("TRANSLOCO_CONFIG",{providedIn:"root",factory:()=>R}),R={defaultLang:"en",reRenderOnLangChange:!1,prodMode:!1,failedRetries:2,fallbackLang:[],availableLangs:[],missingHandler:{logMissingKey:!0,useFallbackTranslation:!1,allowEmpty:!1},flatten:{aot:!1},interpolation:["{{","}}"]};function Ce(t={}){return A(h(h({},R),t),{missingHandler:h(h({},R.missingHandler),t.missingHandler),flatten:h(h({},R.flatten),t.flatten)})}var ge=new v("TRANSLOCO_TRANSPILER"),je=(()=>{class t{config=ne(O,{optional:!0})??R;get interpolationMatcher(){return Re(this.config)}transpile({value:e,params:n={},translation:i,key:s}){if(j(e)){let a,o=e;for(;(a=this.interpolationMatcher.exec(o))!==null;){let[f,l]=a;o=o.replace(f,()=>{let c=l.trim(),u=x(n,c);return ce(u)?u:ce(i[c])?this.transpile({params:n,translation:i,key:s,value:i[c]}):""})}return o}else n&&(G(e)?e=this.handleObject({value:e,params:n,translation:i,key:s}):Array.isArray(e)&&(e=this.handleArray({value:e,params:n,translation:i,key:s})));return e}handleObject({value:e,params:n={},translation:i,key:s}){let a=e;return Object.keys(n).forEach(o=>{let f=this.transpile({value:x(a,o),params:x(n,o),translation:i,key:s});a=Te(a,o,f)}),a}handleArray(i){var s=i,{value:e}=s,n=z(s,["value"]);return e.map(a=>this.transpile(h({value:a},n)))}static \u0275fac=function(n){return new(n||t)};static \u0275prov=T({token:t,factory:t.\u0275fac})}return t})();function Re(t){let[r,e]=t.interpolation;return new RegExp(`${r}([^${r}${e}]*?)${e}`,"g")}var pe=new v("TRANSLOCO_MISSING_HANDLER"),Me=(()=>{class t{handle(e,n){if(n.missingHandler.logMissingKey&&!n.prodMode){let i=`Missing translation for '${e}'`;console.warn(`%c ${i}`,"font-size: 12px; color: red")}return e}static \u0275fac=function(n){return new(n||t)};static \u0275prov=T({token:t,factory:t.\u0275fac})}return t})(),ve=new v("TRANSLOCO_INTERCEPTOR"),Ne=(()=>{class t{preSaveTranslation(e){return e}preSaveTranslationKey(e,n){return n}static \u0275fac=function(n){return new(n||t)};static \u0275prov=T({token:t,factory:t.\u0275fac})}return t})(),Le=new v("TRANSLOCO_FALLBACK_STRATEGY"),Fe=(()=>{class t{userConfig;constructor(e){this.userConfig=e}getNextLangs(){let e=this.userConfig.fallbackLang;if(!e)throw new Error("When using the default fallback, a fallback language must be provided in the config!");return Array.isArray(e)?e:[e]}static \u0275fac=function(n){return new(n||t)(L(O))};static \u0275prov=T({token:t,factory:t.\u0275fac})}return t})();function M(t){if(!t)return"";let r=t.split("/");return r.pop(),r.join("/")}function y(t){return t?t.split("/").pop():""}function k(t,r,e="|"){if(j(t)){let n=t.split(e),i=n.pop();return i===r?[!0,n.toString()]:[!1,i]}return[!1,""]}function $e(t,r){let[e]=k(r,"static");return e?!1:!!t.config.reRenderOnLangChange}function Ie(t){return t?r=>r:q(1)}function De(t,r){return Object.keys(t).reduce((e,n)=>(e[`${r}/${n}`]=t[n],e),{})}function ye(t,r){return Ae(t)?De(t.loader,r):void 0}function P(t){return{scope:M(t)||null,langName:y(t)}}function be(t){let{path:r,inlineLoader:e,mainLoader:n,data:i}=t;if(e){let s=e[r];if(Se(s)===!1)throw`You're using an inline loader but didn't provide a loader for ${r}`;return e[r]().then(a=>a.default?a.default:a)}return n.getTranslation(r,i)}function Ee({mainLoader:t,path:r,data:e,fallbackPath:n,inlineLoader:i}){return(n?[r,n]:[r]).map(a=>{let o=be({path:a,mainLoader:t,inlineLoader:i,data:e});return $(o).pipe(m(f=>({translation:f,lang:a})))})}var me;function mt(t,r={},e){return me.translate(t,r,e)}var _e=(()=>{class t{loader;parser;missingHandler;interceptor;fallbackStrategy;langChanges$;translations=new Map;cache=new Map;firstFallbackLang;defaultLang="";availableLangs=[];isResolvedMissingOnce=!1;lang;failedLangs=new Set;events=new J;events$=this.events.asObservable();config;constructor(e,n,i,s,a,o){this.loader=e,this.parser=n,this.missingHandler=i,this.interceptor=s,this.fallbackStrategy=o,this.loader||(this.loader=new V(this.translations)),me=this,this.config=JSON.parse(JSON.stringify(a)),this.setAvailableLangs(this.config.availableLangs||[]),this.setFallbackLangForMissingTranslation(this.config),this.setDefaultLang(this.config.defaultLang),this.lang=new W(this.getDefaultLang()),this.langChanges$=this.lang.asObservable(),this.events$.pipe(se()).subscribe(f=>{f.type==="translationLoadSuccess"&&f.wasFailure&&this.setActiveLang(f.payload.langName)})}getDefaultLang(){return this.defaultLang}setDefaultLang(e){this.defaultLang=e}getActiveLang(){return this.lang.getValue()}setActiveLang(e){return this.parser.onLangChanged?.(e),this.lang.next(e),this.events.next({type:"langChanged",payload:P(e)}),this}setAvailableLangs(e){this.availableLangs=e}getAvailableLangs(){return this.availableLangs}load(e,n={}){let i=this.cache.get(e);if(i)return i;let s,a=this._isLangScoped(e),o;a&&(o=M(e));let f={path:e,mainLoader:this.loader,inlineLoader:n.inlineLoader,data:a?{scope:o}:void 0};if(this.useFallbackTranslation(e)){let c=a?`${o}/${this.firstFallbackLang}`:this.firstFallbackLang,u=Ee(A(h({},f),{fallbackPath:c}));s=I(u)}else{let c=be(f);s=$(c)}let l=s.pipe(Q(this.config.failedRetries),ee(c=>{if(Array.isArray(c)){c.forEach(u=>{this.handleSuccess(u.lang,u.translation),u.lang!==e&&this.cache.set(u.lang,F({}))});return}this.handleSuccess(e,c)}),Z(c=>(this.config.prodMode||console.error(`Error while trying to load "${e}"`,c),this.handleFailure(e,n))),X(1));return this.cache.set(e,l),l}translate(e,n={},i=this.getActiveLang()){if(!e)return e;let{scope:s,resolveLang:a}=this.resolveLangAndScope(i);if(Array.isArray(e))return e.map(l=>this.translate(s?`${s}.${l}`:l,n,a));e=s?`${s}.${e}`:e;let o=this.getTranslation(a),f=o[e];return f?this.parser.transpile({value:f,params:n,translation:o,key:e}):this._handleMissingKey(e,f,n)}selectTranslate(e,n,i,s=!1){let a,o=(l,c)=>this.load(l,c).pipe(m(()=>s?this.translateObject(e,n,l):this.translate(e,n,l)));if(K(i))return this.langChanges$.pipe(w(l=>o(l)));if(i=Array.isArray(i)?i[0]:i,he(i)){let l=i;i=l.scope,a=ye(l,l.scope)}if(i=i,this.isLang(i)||this.isScopeWithLang(i))return o(i);let f=i;return this.langChanges$.pipe(w(l=>o(`${f}/${l}`,{inlineLoader:a})))}isScopeWithLang(e){return this.isLang(y(e))}translateObject(e,n={},i=this.getActiveLang()){if(j(e)||Array.isArray(e)){let{resolveLang:a,scope:o}=this.resolveLangAndScope(i);if(Array.isArray(e))return e.map(c=>this.translateObject(o?`${o}.${c}`:c,n,a));let f=this.getTranslation(a);e=o?`${o}.${e}`:e;let l=we(this.getObjectByKey(f,e));return Oe(l)?this.translate(e,n,i):this.parser.transpile({value:l,params:n,translation:f,key:e})}let s=[];for(let[a,o]of this.getEntries(e))s.push(this.translateObject(a,o,i));return s}selectTranslateObject(e,n,i){if(j(e)||Array.isArray(e))return this.selectTranslate(e,n,i,!0);let[[s,a],...o]=this.getEntries(e);return this.selectTranslateObject(s,a,i).pipe(m(f=>{let l=[f];for(let[c,u]of o)l.push(this.translateObject(c,u,i));return l}))}getTranslation(e){if(e){if(this.isLang(e))return this.translations.get(e)||{};{let{scope:n,resolveLang:i}=this.resolveLangAndScope(e),s=this.translations.get(i)||{};return this.getObjectByKey(s,n)}}return this.translations}selectTranslation(e){let n=this.langChanges$;if(e){let i=y(e)!==e;this.isLang(e)||i?n=F(e):n=this.langChanges$.pipe(m(s=>`${e}/${s}`))}return n.pipe(w(i=>this.load(i).pipe(m(()=>this.getTranslation(i)))))}setTranslation(e,n=this.getActiveLang(),i={}){let a=h(h({},{merge:!0,emitChange:!0}),i),o=M(n),f=e;if(o){let g=this.getMappedScope(o);f=le({[g]:e})}let l=o?y(n):n,c=h(h({},a.merge&&this.getTranslation(l)),f),u=this.config.flatten.aot?c:le(c),d=this.interceptor.preSaveTranslation(u,l);this.translations.set(l,d),a.emitChange&&this.setActiveLang(this.getActiveLang())}setTranslationKey(e,n,i={}){let s=i.lang||this.getActiveLang(),a=this.interceptor.preSaveTranslationKey(e,n,s),o={[e]:a};this.setTranslation(o,s,A(h({},i),{merge:!0}))}setFallbackLangForMissingTranslation({fallbackLang:e}){let n=Array.isArray(e)?e[0]:e;e&&this.useFallbackTranslation(n)&&(this.firstFallbackLang=n)}_handleMissingKey(e,n,i){if(this.config.missingHandler.allowEmpty&&n==="")return"";if(!this.isResolvedMissingOnce&&this.useFallbackTranslation()){this.isResolvedMissingOnce=!0;let s=this.translate(e,i,this.firstFallbackLang);return this.isResolvedMissingOnce=!1,s}return this.missingHandler.handle(e,this.getMissingHandlerData(),i)}_isLangScoped(e){return this.getAvailableLangsIds().indexOf(e)===-1}isLang(e){return this.getAvailableLangsIds().indexOf(e)!==-1}_loadDependencies(e,n){let i=y(e);return this._isLangScoped(e)&&!this.isLoadedTranslation(i)?U([this.load(i),this.load(e,{inlineLoader:n})]):this.load(e,{inlineLoader:n})}_completeScopeWithLang(e){return this._isLangScoped(e)&&!this.isLang(y(e))?`${e}/${this.getActiveLang()}`:e}_setScopeAlias(e,n){this.config.scopeMapping||(this.config.scopeMapping={}),this.config.scopeMapping[e]=n}ngOnDestroy(){this.cache.clear()}isLoadedTranslation(e){return fe(this.getTranslation(e))}getAvailableLangsIds(){let e=this.getAvailableLangs()[0];return j(e)?this.getAvailableLangs():this.getAvailableLangs().map(n=>n.id)}getMissingHandlerData(){return A(h({},this.config),{activeLang:this.getActiveLang(),availableLangs:this.availableLangs,defaultLang:this.defaultLang})}useFallbackTranslation(e){return this.config.missingHandler.useFallbackTranslation&&e!==this.firstFallbackLang}handleSuccess(e,n){this.setTranslation(n,e,{emitChange:!1}),this.events.next({wasFailure:!!this.failedLangs.size,type:"translationLoadSuccess",payload:P(e)}),this.failedLangs.forEach(i=>this.cache.delete(i)),this.failedLangs.clear()}handleFailure(e,n){K(n.failedCounter)&&(n.failedCounter=0,n.fallbackLangs||(n.fallbackLangs=this.fallbackStrategy.getNextLangs(e)));let i=e.split("/"),a=n.fallbackLangs[n.failedCounter];if(this.failedLangs.add(e),this.cache.has(a))return this.handleSuccess(a,this.getTranslation(a)),Y;let o=a===i[i.length-1];if(!a||o){let l="Unable to load translation and all the fallback languages";throw i.length>1&&(l+=", did you misspelled the scope name?"),new Error(l)}let f=a;return i.length>1&&(i[i.length-1]=a,f=i.join("/")),n.failedCounter++,this.events.next({type:"translationLoadFailure",payload:P(e)}),this.load(f,n)}getMappedScope(e){let{scopeMapping:n={}}=this.config;return n[e]||de(e)}resolveLangAndScope(e){let n=e,i;if(this._isLangScoped(e)){let s=y(e),a=this.isLang(s);n=a?s:this.getActiveLang(),i=this.getMappedScope(a?M(e):e)}return{scope:i,resolveLang:n}}getObjectByKey(e,n){let i={},s=`${n}.`;for(let a in e)a.startsWith(s)&&(i[a.replace(s,"")]=e[a]);return i}getEntries(e){return e instanceof Map?e.entries():Object.entries(e)}static \u0275fac=function(n){return new(n||t)(L(ue,8),L(ge),L(pe),L(ve),L(O),L(Le))};static \u0275prov=T({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var xe=new v("TRANSLOCO_LANG"),Tt=new v("TRANSLOCO_LOADING_TEMPLATE"),Pe=new v("TRANSLOCO_SCOPE"),H=class{initialized=!1;resolve({inline:r,provider:e,active:n}){let i=n;if(this.initialized)return i=n,i;if(e){let[,s]=k(e,"static");i=s}if(r){let[,s]=k(r,"static");i=s}return this.initialized=!0,i}resolveLangBasedOnScope(r){return M(r)?y(r):r}resolveLangPath(r,e){return e?`${e}/${r}`:r}},B=class{service;constructor(r){this.service=r}resolve(r){let{inline:e,provider:n}=r;if(e)return e;if(n){if(he(n)){let{scope:i,alias:s=de(i)}=n;return this.service._setScopeAlias(i,s),i}return n}}};var Ot=(()=>{class t{service;providerScope;providerLang;cdr;subscription=null;lastValue="";lastKey;path;langResolver=new H;scopeResolver;constructor(e,n,i,s){this.service=e,this.providerScope=n,this.providerLang=i,this.cdr=s,this.scopeResolver=new B(this.service)}transform(e,n,i){if(!e)return e;let s=n?`${e}${JSON.stringify(n)}`:e;if(s===this.lastKey)return this.lastValue;this.lastKey=s,this.subscription?.unsubscribe();let a=$e(this.service,this.providerLang||i);return this.subscription=this.service.langChanges$.pipe(w(o=>{let f=this.langResolver.resolve({inline:i,provider:this.providerLang,active:o});return Array.isArray(this.providerScope)?I(this.providerScope.map(l=>this.resolveScope(f,l))):this.resolveScope(f,this.providerScope)}),Ie(a)).subscribe(()=>this.updateValue(e,n)),this.lastValue}ngOnDestroy(){this.subscription?.unsubscribe(),this.subscription=null}updateValue(e,n){let i=this.langResolver.resolveLangBasedOnScope(this.path);this.lastValue=this.service.translate(e,n,i),this.cdr.markForCheck()}resolveScope(e,n){let i=this.scopeResolver.resolve({inline:void 0,provider:n});this.path=this.langResolver.resolveLangPath(e,i);let s=ye(n,i);return this.service._loadDependencies(this.path,s)}static \u0275fac=function(n){return new(n||t)(C(_e,16),C(Pe,24),C(xe,24),C(D,16))};static \u0275pipe=re({name:"transloco",type:t,pure:!1,standalone:!0})}return t})();var St=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=ie({type:t});static \u0275inj=te({})}return t})();function At(t){let r=[ke(je),Be(Me),Ge(Ne),He(Fe)];return t.config&&r.push(Ve(t.config)),t.loader&&r.push(Ke(t.loader)),r}function Ve(t){return b([{provide:O,useValue:Ce(t)}])}function Ke(t){return b([{provide:ue,useClass:t}])}function ke(t){return b([{provide:ge,useClass:t,deps:[O]}])}function He(t){return b([{provide:Le,useClass:t,deps:[O]}])}function Be(t){return b([{provide:pe,useClass:t}])}function Ge(t){return b([{provide:ve,useClass:t}])}var wt=new v("TRANSLOCO_TEST_LANGS - Available testing languages"),Ct=new v("TRANSLOCO_TEST_OPTIONS - Testing options");export{mt as a,Ot as b,St as c,At as d};
