var t="http://www.w3.org/1999/xhtml";const n={svg:"http://www.w3.org/2000/svg",xhtml:t,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function i(t){var i=t+="",r=i.indexOf(":");return r>=0&&"xmlns"!==(i=t.slice(0,r))&&(t=t.slice(r+1)),n.hasOwnProperty(i)?{space:n[i],local:t}:t}function r(n){return function(){var i=this.ownerDocument,r=this.namespaceURI;return r===t&&i.documentElement.namespaceURI===t?i.createElement(n):i.createElementNS(r,n)}}function e(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function u(t){var n=i(t);return(n.local?e:r)(n)}function s(){}function o(t){return null==t?s:function(){return this.querySelector(t)}}function c(){return[]}function f(t){return null==t?c:function(){return this.querySelectorAll(t)}}function h(t){return function(){return this.matches(t)}}function l(t){return new Array(t.length)}function a(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}function v(t,n,i,r,e,u){for(var s,o=0,c=n.length,f=u.length;o<f;++o)(s=n[o])?(s.__data__=u[o],r[o]=s):i[o]=new a(t,u[o]);for(;o<c;++o)(s=n[o])&&(e[o]=s)}function w(t,n,i,r,e,u,s){var o,c,f,h={},l=n.length,v=u.length,w=new Array(l);for(o=0;o<l;++o)(c=n[o])&&(w[o]=f="$"+s.call(c,c.__data__,o,n),f in h?e[o]=c:h[f]=c);for(o=0;o<v;++o)(c=h[f="$"+s.call(t,u[o],o,u)])?(r[o]=c,c.__data__=u[o],h[f]=null):i[o]=new a(t,u[o]);for(o=0;o<l;++o)(c=n[o])&&h[w[o]]===c&&(e[o]=c)}function y(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function p(t){return function(){this.removeAttribute(t)}}function d(t){return function(){this.removeAttributeNS(t.space,t.local)}}function m(t,n){return function(){this.setAttribute(t,n)}}function g(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function b(t,n){return function(){var i=n.apply(this,arguments);null==i?this.removeAttribute(t):this.setAttribute(t,i)}}function A(t,n){return function(){var i=n.apply(this,arguments);null==i?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,i)}}function x(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function F(t){return function(){this.style.removeProperty(t)}}function O(t,n,i){return function(){this.style.setProperty(t,n,i)}}function D(t,n,i){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,i)}}function N(t,n){return t.style.getPropertyValue(n)||x(t).getComputedStyle(t,null).getPropertyValue(n)}function E(t){return function(){delete this[t]}}function j(t,n){return function(){this[t]=n}}function S(t,n){return function(){var i=n.apply(this,arguments);null==i?delete this[t]:this[t]=i}}function B(t){return t.trim().split(/^|\s+/)}function _(t){return t.classList||new k(t)}function k(t){this._node=t,this._names=B(t.getAttribute("class")||"")}function C(t,n){for(var i=_(t),r=-1,e=n.length;++r<e;)i.add(n[r])}function I(t,n){for(var i=_(t),r=-1,e=n.length;++r<e;)i.remove(n[r])}function L(t){return function(){C(this,t)}}function G(t){return function(){I(this,t)}}function P(t,n){return function(){(n.apply(this,arguments)?C:I)(this,t)}}function M(){this.textContent=""}function T(t){return function(){this.textContent=t}}function W(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function $(){this.innerHTML=""}function q(t){return function(){this.innerHTML=t}}function J(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function R(){this.nextSibling&&this.parentNode.appendChild(this)}function z(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function H(){return null}function U(){var t=this.parentNode;t&&t.removeChild(this)}function V(){var t=this.cloneNode(!1),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function X(){var t=this.cloneNode(!0),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}a.prototype={constructor:a,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}},k.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var K={},Q=null;function Y(t,n,i){return t=Z(t,n,i),function(n){var i=n.relatedTarget;i&&(i===this||8&i.compareDocumentPosition(this))||t.call(this,n)}}function Z(t,n,i){return function(r){var e=Q;Q=r;try{t.call(this,this.__data__,n,i)}finally{Q=e}}}function tt(t){return t.trim().split(/^|\s+/).map((function(t){var n="",i=t.indexOf(".");return i>=0&&(n=t.slice(i+1),t=t.slice(0,i)),{type:t,name:n}}))}function nt(t){return function(){var n=this.__on;if(n){for(var i,r=0,e=-1,u=n.length;r<u;++r)i=n[r],t.type&&i.type!==t.type||i.name!==t.name?n[++e]=i:this.removeEventListener(i.type,i.listener,i.capture);++e?n.length=e:delete this.__on}}}function it(t,n,i){var r=K.hasOwnProperty(t.type)?Y:Z;return function(e,u,s){var o,c=this.__on,f=r(n,u,s);if(c)for(var h=0,l=c.length;h<l;++h)if((o=c[h]).type===t.type&&o.name===t.name)return this.removeEventListener(o.type,o.listener,o.capture),this.addEventListener(o.type,o.listener=f,o.capture=i),void(o.value=n);this.addEventListener(t.type,f,i),o={type:t.type,name:t.name,value:n,listener:f,capture:i},c?c.push(o):this.__on=[o]}}function rt(t,n,i){var r=x(t),e=r.CustomEvent;"function"==typeof e?e=new e(n,i):(e=r.document.createEvent("Event"),i?(e.initEvent(n,i.bubbles,i.cancelable),e.detail=i.detail):e.initEvent(n,!1,!1)),t.dispatchEvent(e)}function et(t,n){return function(){return rt(this,t,n)}}function ut(t,n){return function(){return rt(this,t,n.apply(this,arguments))}}"undefined"!=typeof document&&("onmouseenter"in document.documentElement||(K={mouseenter:"mouseover",mouseleave:"mouseout"}));var st=[null];function ot(t,n){this._groups=t,this._parents=n}function ct(){return new ot([[document.documentElement]],st)}function ft(t){return"string"==typeof t?new ot([[document.querySelector(t)]],[document.documentElement]):new ot([[t]],st)}function ht(t,n=3){let i=Number(t);return isNaN(i)?t:i%1==0?i.toFixed(0):at(t,n)}function lt(t){let n=Number(t);return isNaN(n)?t:n%1==0?n.toFixed(0):at(t,2)}function at(t,n){let i;try{i=parseFloat(t)}catch(n){return t}return isNaN(i)?t:i.toFixed(n)}function vt(t){return new URLSearchParams(window.location.search).get(t)}function wt(t,n="normal"){t=t.toLowerCase().replace(/\s/g,"-");let i={darkest:{"technical-foundations":"#536B35","accessibility-and-inclusion":"#291E44","public-engagement":"#136664",effectiveness:"#600B4E","service-experience":"#3A191D",overall:"#385cbf"},dark:{"technical-foundations":"#719148","accessibility-and-inclusion":"#3f306a","public-engagement":"#1a8b89",effectiveness:"#86106c","service-experience":"#ae4a56",overall:"#385cbf"},normal:{"technical-foundations":"#96c160","accessibility-and-inclusion":"#7e60d4","public-engagement":"#23b9b6",effectiveness:"#b31590","service-experience":"#e86372",overall:"#4b7aff"},light:{"technical-foundations":"#B3E874","accessibility-and-inclusion":"#9570F9","public-engagement":"#2AE0DD",effectiveness:"#D81AAF","service-experience":"#FF6D7E",overall:"#9eb7ff"},lightest:{"technical-foundations":"#C5FF7F","accessibility-and-inclusion":"#9872FF","public-engagement":"#30FFFB",effectiveness:"#FF1ECE","service-experience":"#FF6D96",overall:"#9eb7ff"}}[n];return t in i?i[t]:"#6D88A3"}function yt(t,n){var i;if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(t))return 3==(i=t.substring(1).split("")).length&&(i=[i[0],i[0],i[1],i[1],i[2],i[2]]),"rgba("+[(i="0x"+i.join(""))>>16&255,i>>8&255,255&i].join(",")+","+n+")";throw new Error("Bad Hex")}function pt(t,n){return function(){for(var i=ft(this),r=i.text().length,e=i.text();r>t-2*n&&e.length>0;)e=e.slice(0,-1),i.text(e+"…"),r=i.text().length}}ot.prototype=ct.prototype={constructor:ot,select:function(t){"function"!=typeof t&&(t=o(t));for(var n=this._groups,i=n.length,r=new Array(i),e=0;e<i;++e)for(var u,s,c=n[e],f=c.length,h=r[e]=new Array(f),l=0;l<f;++l)(u=c[l])&&(s=t.call(u,u.__data__,l,c))&&("__data__"in u&&(s.__data__=u.__data__),h[l]=s);return new ot(r,this._parents)},selectAll:function(t){"function"!=typeof t&&(t=f(t));for(var n=this._groups,i=n.length,r=[],e=[],u=0;u<i;++u)for(var s,o=n[u],c=o.length,h=0;h<c;++h)(s=o[h])&&(r.push(t.call(s,s.__data__,h,o)),e.push(s));return new ot(r,e)},filter:function(t){"function"!=typeof t&&(t=h(t));for(var n=this._groups,i=n.length,r=new Array(i),e=0;e<i;++e)for(var u,s=n[e],o=s.length,c=r[e]=[],f=0;f<o;++f)(u=s[f])&&t.call(u,u.__data__,f,s)&&c.push(u);return new ot(r,this._parents)},data:function(t,n){if(!t)return p=new Array(this.size()),h=-1,this.each((function(t){p[++h]=t})),p;var i,r=n?w:v,e=this._parents,u=this._groups;"function"!=typeof t&&(i=t,t=function(){return i});for(var s=u.length,o=new Array(s),c=new Array(s),f=new Array(s),h=0;h<s;++h){var l=e[h],a=u[h],y=a.length,p=t.call(l,l&&l.__data__,h,e),d=p.length,m=c[h]=new Array(d),g=o[h]=new Array(d);r(l,a,m,g,f[h]=new Array(y),p,n);for(var b,A,x=0,F=0;x<d;++x)if(b=m[x]){for(x>=F&&(F=x+1);!(A=g[F])&&++F<d;);b._next=A||null}}return(o=new ot(o,e))._enter=c,o._exit=f,o},enter:function(){return new ot(this._enter||this._groups.map(l),this._parents)},exit:function(){return new ot(this._exit||this._groups.map(l),this._parents)},join:function(t,n,i){var r=this.enter(),e=this,u=this.exit();return r="function"==typeof t?t(r):r.append(t+""),null!=n&&(e=n(e)),null==i?u.remove():i(u),r&&e?r.merge(e).order():e},merge:function(t){for(var n=this._groups,i=t._groups,r=n.length,e=Math.min(r,i.length),u=new Array(r),s=0;s<e;++s)for(var o,c=n[s],f=i[s],h=c.length,l=u[s]=new Array(h),a=0;a<h;++a)(o=c[a]||f[a])&&(l[a]=o);for(;s<r;++s)u[s]=n[s];return new ot(u,this._parents)},order:function(){for(var t=this._groups,n=-1,i=t.length;++n<i;)for(var r,e=t[n],u=e.length-1,s=e[u];--u>=0;)(r=e[u])&&(s&&4^r.compareDocumentPosition(s)&&s.parentNode.insertBefore(r,s),s=r);return this},sort:function(t){function n(n,i){return n&&i?t(n.__data__,i.__data__):!n-!i}t||(t=y);for(var i=this._groups,r=i.length,e=new Array(r),u=0;u<r;++u){for(var s,o=i[u],c=o.length,f=e[u]=new Array(c),h=0;h<c;++h)(s=o[h])&&(f[h]=s);f.sort(n)}return new ot(e,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){var t=new Array(this.size()),n=-1;return this.each((function(){t[++n]=this})),t},node:function(){for(var t=this._groups,n=0,i=t.length;n<i;++n)for(var r=t[n],e=0,u=r.length;e<u;++e){var s=r[e];if(s)return s}return null},size:function(){var t=0;return this.each((function(){++t})),t},empty:function(){return!this.node()},each:function(t){for(var n=this._groups,i=0,r=n.length;i<r;++i)for(var e,u=n[i],s=0,o=u.length;s<o;++s)(e=u[s])&&t.call(e,e.__data__,s,u);return this},attr:function(t,n){var r=i(t);if(arguments.length<2){var e=this.node();return r.local?e.getAttributeNS(r.space,r.local):e.getAttribute(r)}return this.each((null==n?r.local?d:p:"function"==typeof n?r.local?A:b:r.local?g:m)(r,n))},style:function(t,n,i){return arguments.length>1?this.each((null==n?F:"function"==typeof n?D:O)(t,n,null==i?"":i)):N(this.node(),t)},property:function(t,n){return arguments.length>1?this.each((null==n?E:"function"==typeof n?S:j)(t,n)):this.node()[t]},classed:function(t,n){var i=B(t+"");if(arguments.length<2){for(var r=_(this.node()),e=-1,u=i.length;++e<u;)if(!r.contains(i[e]))return!1;return!0}return this.each(("function"==typeof n?P:n?L:G)(i,n))},text:function(t){return arguments.length?this.each(null==t?M:("function"==typeof t?W:T)(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?$:("function"==typeof t?J:q)(t)):this.node().innerHTML},raise:function(){return this.each(R)},lower:function(){return this.each(z)},append:function(t){var n="function"==typeof t?t:u(t);return this.select((function(){return this.appendChild(n.apply(this,arguments))}))},insert:function(t,n){var i="function"==typeof t?t:u(t),r=null==n?H:"function"==typeof n?n:o(n);return this.select((function(){return this.insertBefore(i.apply(this,arguments),r.apply(this,arguments)||null)}))},remove:function(){return this.each(U)},clone:function(t){return this.select(t?X:V)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:function(t,n,i){var r,e,u=tt(t+""),s=u.length;if(!(arguments.length<2)){for(o=n?it:nt,null==i&&(i=!1),r=0;r<s;++r)this.each(o(u[r],n,i));return this}var o=this.node().__on;if(o)for(var c,f=0,h=o.length;f<h;++f)for(r=0,c=o[f];r<s;++r)if((e=u[r]).type===c.type&&e.name===c.name)return c.value},dispatch:function(t,n){return this.each(("function"==typeof n?ut:et)(t,n))}};class dt{constructor(){this.key=null,this.value=null,this.keyCategory=null}fromTuple(t){this.key=t.key,this.value=t.value}asTuple(){let t={};return t[this.key]=this.value,t}}class mt{constructor(){this.items=[]}getItem(t){let n=this.items.filter((function(n){return n.key===t}));return 1===n.length?n[0]:null}get(t){let n=this.getItem(t);return n?n.value:null}filter(t){let n=this.items;this.items.length>0&&(n=this.items.filter((function(n){return t.includes(n.key)})));let i=new mt;return i.items=n,i}contains(t){return 0!==this.items.filter((function(n){return n.key===t.key&&(n.value===t.value||"*any"===t.value)})).length}asObject(){let t={};for(let n=0;n<this.items.length;n++)t[this.items[n].key]=this.items[n].value;return t}fromObject(t){let n=this.reshapeData(t,null);for(let t=0;t<n.length;t++){let i=new dt;i.fromTuple(n[t]),this.items.push(i)}}reshapeData(t,n){let i=Object.entries(t).map((([t,n])=>({key:t,value:n})));return n&&(i=i.filter((function(t){return n.includes(t.key)}))),i}}class gt{constructor(t,n=null,i=null,r=null){this.source_data=null,this.data=null,this.sourceDataType=null,this.group=null,this.mappings={},this.keys=null,this.keyCategories=null,this.metadata={},this.source_data=t,this.sourceDataType=n,this.group=i,this.mappings=r,this.keys=new Set,this.keyCategories=new Set,this.createInternalRepresentation()}createInternalRepresentation(){this.data=[],this.sourceDataType||this.detectDataStructure(),"WIDE"===this.sourceDataType?this.importWideData():"LONG"===this.sourceDataType?this.importLongData():this.importGeoJSONData()}detectDataStructure(){if("features"in this.source_data)this.sourceDataType="GEOJSON";else if("value"in this.source_data[0]){let t=Object.keys(this.source_data[0]);this.sourceDataType="LONG",this.mappings={},this.mappings.value="value",t=At(t,"value"),"Country"in this.source_data[0]?(this.group="Country",t=At(t,"Country")):"country"in this.source_data[0]&&(this.group="country",t=At(t,"country")),"indicator"in this.source_data[0]&&(this.mappings.key="indicator",t=At(t,"indicator")),"measure"in this.source_data[0]&&(this.mappings.key="measure",t=At(t,"measure")),"pillar"in this.source_data[0]&&(this.mappings.keyCategory="pillar",t=At(t,"pillar")),"category"in this.source_data[0]&&(this.mappings.keyCategory="category",t=At(t,"category")),this.group||(this.group=t.pop())}else this.sourceDataType="WIDE"}importWideData(){for(let t=0;t<this.source_data.length;t++){let n=new mt;n.fromObject(this.source_data[t]),this.data.push(n)}}importLongData(){let t=[];for(let n=0;n<this.source_data.length;n++)t.includes(this.source_data[n][this.group])||t.push(this.source_data[n][this.group]);let n=[];for(let i=0;i<t.length;i++){let r=new mt,e=new dt;e.key=this.group,e.value=t[i],r.items.push(e),n.push(r)}let i=Object.keys(this.source_data[0]),r=Object.values(this.mappings);i=At(i,this.group),i=i.filter((function(t){return-1===r.indexOf(t)}));for(let t=0;t<this.source_data.length;t++){let i=this.source_data[t],r=new dt;r.key=i[this.mappings.key],r.value=i[this.mappings.value],r.keyCategory=i[this.mappings.keyCategory],r.key===r.keyCategory&&"Overall"!==r.key||(this.metadata[r.key]=r.keyCategory,this.keys.add(r.key),this.keyCategories.add(r.keyCategory));let e=i[this.group];for(let t=0;t<n.length;t++)n[t].get(this.group)==e&&n[t].items.push(r)}for(let t=0;t<n.length;t++){let r=n[t],e=[];for(let t=0;t<i.length;t++){let n=new dt;n.key=i[t];let u=this.group,s=r.get(this.group),o=this.source_data.filter((function(t){return t[u]==s}));n.value=o[0][i[t]],n.keyCategory="dimensions",e.push(n)}r.items=r.items.concat(e)}this.data=n}importGeoJSONData(){let t=this.source_data.features;for(let n=0;n<t.length;n++){let i=new mt;i.fromObject(t[n].properties),this.data.push(i)}}getPillar(t){return t in this.metadata?this.metadata[t]:Object.values(this.metadata).includes(t)?t:null}keyList(t,n=null){if(!t)return[];let i=t.split(",").map((t=>t.trim())),r=i.indexOf("@pillars"),e=i.indexOf("@indicators"),u=i.indexOf("@overall");if(-1!==r){let t=Array.from(this.keyCategories).sort(gt.sortByPillar);i.splice(r,1,...t)}if(-1!==u&&n&&i.splice(u,1,n),-1!==e)if(n){let t=[];for(const[i,r]of Object.entries(this.metadata))r===n&&t.push(i);i.splice(e,1,...Array.from(t))}else{let t=Array.from(this.keyCategories).sort(gt.sortByPillar),n=Array.from(this.keys),r=[];for(let i=0;i<t.length;i++)for(let e=0;e<n.length;e++)this.metadata[n[e]]===t[i]&&r.push(n[e]);i.splice(e,1,...r)}return i}static sortByPillar(t,n){let i={"Service experience":5,"Accessibility and inclusion":4,"Public engagement":3,Effectiveness:2,"Technical foundations":1,Overall:0};return i[t]&&(t=i[t]),i[n]&&(n=i[n]),t-n}static getDataItemFilter(t){let n=new mt;return n.fromObject(t),n}get(t={}){return this.filterByMatchingItems(this.data,gt.getDataItemFilter(t))||null}getOne(t={}){let n=this.get(t);return 1===n.length?n[0].asObject():null}getValues(t){let n=[];for(let i=0;i<this.data.length;i++)n.push(this.data[i].get(t));return n}filterByMatchingItems(t,n){return t.filter((function(t){for(let i=0;i<n.items.length;i++)if(!t.contains(n.items[i]))return!1;return!0}))}}async function bt(t){const n="data-model-3";return t?"caches"in window?(await async function(){const t=await caches.keys();for(const n of t){const t=n.startsWith("data-model-");"data-model-3"!==n&&t&&await caches.delete(n)}}(),caches.open(n).then((n=>n.match(t).then((i=>i?i.json().then((t=>new gt(t))):fetch(t,{mode:"cors"}).then((i=>{let r=i.clone();return i.json().then((i=>(n.put(t,r),new gt(i))))}))))))):fetch(t).then((t=>t.json())).then((t=>new gt(t))):null}function At(t,n){return t.filter((t=>t!==n))}export{wt as a,o as b,f as c,ct as d,N as e,lt as f,vt as g,Q as h,ht as i,yt as j,at as k,bt as l,h as m,i as n,ft as s,pt as w}