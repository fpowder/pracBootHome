/*////////////////////
isaacCSPRNG 1.1
https://github.com/macmcmeans/isaacCSPRNG/blob/master/isaacCSPRNG-1.1.min.js
/////////////////////////////////////////////
Copyright (c) 2018, William P. "Mac" McMeans
LICENSE: BSD 3-Clause License
*/
isaacCSPRNG=function(r){return function(r){"use strict";function n(r,n){var t=(65535&r)+(65535&n);return(r>>>16)+(n>>>16)+(t>>>16)<<16|65535&t}function t(r){return parseInt(r)===r}function e(r){for(var n="",t=0;t<r.length;t++){var e=f(33,126);n+=String.fromCharCode(e^r.charCodeAt(t))}return n}function o(r){var t,e,o;for(r=r&&"number"==typeof r?Math.abs(Math.floor(r)):1;r--;)for(v=n(v,1),g=n(g,v),t=0;t<256;t++){switch(3&t){case 0:p^=p<<13;break;case 1:p^=p>>>6;break;case 2:p^=p<<2;break;case 3:p^=p>>>16}p=n(h[t+128&255],p),e=h[t],h[t]=o=n(h[e>>>2&255],n(p,g)),b[t]=g=n(h[o>>>10&255],e)}}function u(){return l--||(o(),l=255),b[l]}function a(){return.5+2.3283064365386963e-10*u()}function f(){var r,n;return 1===arguments.length?(r=0,n=arguments[0]):(r=arguments[0],n=arguments[1]),arguments[0]>arguments[1]&&(r=arguments[1],n=arguments[0]),t(r)&&t(n)?Math.floor(a()*(n-r+1))+r:a()*(n-r)+r}function i(){p=g=v=0;for(var r=0;r<256;++r)h[r]=b[r]=0;l=0}function c(r){function t(){f=n(f,e^=u<<11),u=n(u,a),c=n(c,u^=a>>>2),a=n(a,f),s=n(s,a^=f<<8),f=n(f,c),p=n(p,f^=c>>>16),c=n(c,s),g=n(g,c^=s<<10),s=n(s,p),e=n(e,s^=p>>>4),p=n(p,g),u=n(u,p^=g<<8),g=n(g,e),a=n(a,g^=e>>>9),e=n(e,u)}var e,u,a,f,c,s,p,g,v;if(e=u=a=f=c=s=p=g=2654435769,r&&"string"==typeof r&&(r=function(r){for(var n,t,e,o=[],u=[],a=0,f=r+"\0\0\0",i=f.length-1;a<i;)n=f.charCodeAt(a++),t=f.charCodeAt(a+1),n<128?o.push(n):n<2048?(o.push(n>>>6&31|192),o.push(n>>>0&63|128)):55296!=(63488&n)?(o.push(n>>>12&15|224),o.push(n>>>6&63|128),o.push(n>>>0&63|128)):55296==(64512&n)&&56320==(64512&t)&&(e=65536+(63&t|(63&n)<<10),o.push(e>>>18&7|240),o.push(e>>>12&63|128),o.push(e>>>6&63|128),o.push(e>>>0&63|128),a++),o.length>3&&u.push(o.shift()<<0|o.shift()<<8|o.shift()<<16|o.shift()<<24);return u}(r)),r&&"number"==typeof r&&(r=[r]),r instanceof Array)for(i(),v=0;v<r.length;v++)b[255&v]+="number"==typeof r[v]?r[v]:0;for(v=0;v<4;v++)t();for(v=0;v<256;v+=8)r&&(e=n(e,b[v+0]),u=n(u,b[v+1]),a=n(a,b[v+2]),f=n(f,b[v+3]),c=n(c,b[v+4]),s=n(s,b[v+5]),p=n(p,b[v+6]),g=n(g,b[v+7])),t(),h[v+0]=e,h[v+1]=u,h[v+2]=a,h[v+3]=f,h[v+4]=c,h[v+5]=s,h[v+6]=p,h[v+7]=g;if(r)for(v=0;v<256;v+=8)e=n(e,h[v+0]),u=n(u,h[v+1]),a=n(a,h[v+2]),f=n(f,h[v+3]),c=n(c,h[v+4]),s=n(s,h[v+5]),p=n(p,h[v+6]),g=n(g,h[v+7]),t(),h[v+0]=e,h[v+1]=u,h[v+2]=a,h[v+3]=f,h[v+4]=c,h[v+5]=s,h[v+6]=p,h[v+7]=g;o(),l=256}var s,h=new Array(256),p=0,g=0,v=0,b=new Array(256),l=0,m="1.1",d=new Uint32Array(2),y=new Array;var td=new Date().getTime();d[0]=td;d[1]=td+1; return d,y=d[0]+d[1],s=r||y,c(s),{bytes:function(r){for(var n=new Array(r),t=0;t<r;t++)n[t]=f(255);return n},chars:function(r){for(var n=" ~`_-+={}[]<>/,.:;?|!@#$%^&*()0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",t="",e=0;e<r;e++)t+=n[f(0,n.length-1)];return t},decipher:function(r,n,t){return c(r),e(1===Number(t)?function(r){var t,e=n.match(/.{1,4}/g)||[],o="";for(t=0;t<e.length;t++)o+=String.fromCharCode(parseInt(e[t],16));return o}():n)},double:function(){return a()+1.1102230246251565e-16*(2097152*a()|0)},encipher:function(r,n,t){return c(r),1===Number(t)?function(r){var n,t="";for(n=0;n<r.length;n++)t+=("000"+r.charCodeAt(n).toString(16)).slice(-4);return t}(e(n)):e(n)},export:function(){return JSON.stringify({a:p,b:g,c:v,m:h,r:b,g:l})},import:function(r){var n=JSON.parse(r);p=n.a,g=n.b,v=n.c,h=n.m,b=n.r,l=n.g},int32:function(){var r=u();return r<0?-r:r},internals:function(){return{a:p,b:g,c:v,m:h,r:b}},prng:o,rand:u,range:f,random:a,reset:i,seed:c,version:function(){return m}}}(r)};
