function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},i=n.parcelRequire7bc7;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var i={id:e,exports:{}};return o[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},n.parcelRequire7bc7=i);var r=i("7Y9D8");const l=document.querySelector(".form");function u(e,n){const o=Math.random()>.3;return new Promise(((t,i)=>{setTimeout((()=>{o?t({position:e,delay:n}):i({position:e,delay:n})}),n)}))}l.addEventListener("submit",(function(n){n.preventDefault();const{elements:{delay:o,step:t,amount:i}}=l;let s=1,a=Number(o.value);const d=Number(i.value);for(;s<=d;)u(s,a).then((({position:n,delay:o})=>{e(r).Notify.success(`✅ Fulfilled promise ${n} in ${o}ms`)})).catch((({position:n,delay:o})=>{e(r).Notify.failure(`❌ Rejected promise ${n} in ${o}ms`)})),a+=Number(t.value),s+=1}));
//# sourceMappingURL=03-promises.34b50371.js.map
