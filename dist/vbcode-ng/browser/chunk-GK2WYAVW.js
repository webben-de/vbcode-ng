var q=Object.create;var h=Object.defineProperty,r=Object.defineProperties,s=Object.getOwnPropertyDescriptor,t=Object.getOwnPropertyDescriptors,u=Object.getOwnPropertyNames,g=Object.getOwnPropertySymbols,v=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable;var n=a=>{throw TypeError(a)};var l=(a,b,c)=>b in a?h(a,b,{enumerable:!0,configurable:!0,writable:!0,value:c}):a[b]=c,y=(a,b)=>{for(var c in b||={})k.call(b,c)&&l(a,c,b[c]);if(g)for(var c of g(b))m.call(b,c)&&l(a,c,b[c]);return a},z=(a,b)=>r(a,t(b));var A=(a,b)=>{var c={};for(var d in a)k.call(a,d)&&b.indexOf(d)<0&&(c[d]=a[d]);if(a!=null&&g)for(var d of g(a))b.indexOf(d)<0&&m.call(a,d)&&(c[d]=a[d]);return c};var B=(a,b)=>()=>(b||a((b={exports:{}}).exports,b),b.exports),C=(a,b)=>{for(var c in b)h(a,c,{get:b[c],enumerable:!0})},w=(a,b,c,d)=>{if(b&&typeof b=="object"||typeof b=="function")for(let e of u(b))!k.call(a,e)&&e!==c&&h(a,e,{get:()=>b[e],enumerable:!(d=s(b,e))||d.enumerable});return a};var D=(a,b,c)=>(c=a!=null?q(v(a)):{},w(b||!a||!a.__esModule?h(c,"default",{value:a,enumerable:!0}):c,a));var x=(a,b,c)=>b.has(a)||n("Cannot "+c);var E=(a,b,c)=>b.has(a)?n("Cannot add the same private member more than once"):b instanceof WeakSet?b.add(a):b.set(a,c);var F=(a,b,c)=>(x(a,b,"access private method"),c);var G=(a,b,c)=>new Promise((d,e)=>{var o=f=>{try{i(c.next(f))}catch(j){e(j)}},p=f=>{try{i(c.throw(f))}catch(j){e(j)}},i=f=>f.done?d(f.value):Promise.resolve(f.value).then(o,p);i((c=c.apply(a,b)).next())});export{y as a,z as b,A as c,B as d,C as e,D as f,E as g,F as h,G as i};
