!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.KotlinWasmPlayground=n():e.KotlinWasmPlayground=n()}(this,(()=>(()=>{var e,n,t,r,o={71:e=>{function n(e){return Promise.resolve().then((()=>{var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}))}n.keys=()=>[],n.resolve=n,n.id=71,e.exports=n},641:(e,n,t)=>{"use strict";t.a(e,(async(e,r)=>{try{t.r(n),t.d(n,{default:()=>e});var o=t(345);const e=(await(0,o._)()).exports;r()}catch(e){r(e)}}),1)},345:(e,n,t)=>{"use strict";async function r(e={},n=!0){const t=new WeakMap,r={"kotlin.captureStackTrace_-1334956621":()=>(new Error).stack,"kotlin.wasm.internal.throwJsError_-385587655":(e,n,t)=>{const r=new Error;throw r.message=e,r.name=n,r.stack=t,r},"kotlin.wasm.internal.getJsEmptyString_-164465437":()=>"","kotlin.wasm.internal.getJsTrue_-1478181067":()=>!0,"kotlin.wasm.internal.getJsFalse_1477904862":()=>!1,"kotlin.wasm.internal.stringLength_1772554682":e=>e.length,"kotlin.wasm.internal.jsExportStringToWasm_271128330":(e,n,t,r)=>{const o=new Uint16Array(s.memory.buffer,r,t);let a=0,i=n;for(;a<t;)o.set([e.charCodeAt(i)],a),i++,a++},"kotlin.wasm.internal.importStringFromWasm_-1434832627":(e,n,t)=>{const r=new Uint16Array(s.memory.buffer,e,n),o=String.fromCharCode.apply(null,r);return null==t?o:t+o},"kotlin.wasm.internal.externrefToString_871258856":e=>String(e),"kotlin.wasm.internal.externrefHashCode_1955433539":(()=>{const e=new DataView(new ArrayBuffer(8)),n=new WeakMap;return t=>{if(null==t)return 0;switch(typeof t){case"object":case"function":return function(e){const t=n.get(e);if(void 0===t){const t=4294967296,r=Math.random()*t|0;return n.set(e,r),r}return t}(t);case"number":return function(n){return(0|n)===n?0|n:(e.setFloat64(0,n,!0),(31*e.getInt32(0,!0)|0)+e.getInt32(4,!0)|0)}(t);case"boolean":return t;default:return function(e){for(var n=0,t=0;t<e.length;t++)n=31*n+e.charCodeAt(t)|0;return n}(String(t))}}})(),"kotlin.wasm.internal.isNullish_955678453":e=>null==e,"kotlin.wasm.internal.tryGetOrSetExternrefBox_$external_fun_903163830":(e,n)=>function(e,n){if("object"!=typeof e)return n;const r=t.get(e);return void 0!==r?r:(t.set(e,n),n)}(e,n),"kotlin.js.__callJsClosure_o0vpnl_-332838811":(e,n)=>e(n),"kotlin.js.__callJsClosure_vhne0b_-1225296359":(e,n)=>e(n),"kotlin.random.initialSeed_714621149":()=>Math.random()*Math.pow(2,32)|0,"kotlinx.browser.document_$external_prop_getter_85945489":()=>document,"org.w3c.dom.body_$external_prop_getter_-1797460166":e=>e.body,"org.w3c.dom.createTextNode_$external_fun_1649979942":(e,n)=>e.createTextNode(n),"org.w3c.dom.ownerDocument_$external_prop_getter_1104418837":e=>e.ownerDocument,"org.w3c.dom.appendChild_$external_fun_-1637123743":(e,n)=>e.appendChild(n)};let o,a,s;const i="undefined"!=typeof process&&"node"===process.release.name,l=!i&&("undefined"!=typeof d8||"undefined"!=typeof inIon||"undefined"!=typeof jscOptions),m=!i&&!l&&"undefined"!=typeof window;if(!i&&!l&&!m)throw"Supported JS engine not detected";const c="./KotlinWasmPlayground-wasm.wasm",u={js_code:r};try{if(i){a=(await import("node:module")).default.createRequire("file:///home/runner/work/KotlinWasmPlayground/KotlinWasmPlayground/build/js/packages/KotlinWasmPlayground-wasm/kotlin/KotlinWasmPlayground-wasm.uninstantiated.mjs");const e=a("fs"),n=a("path"),t=a("url").fileURLToPath("file:///home/runner/work/KotlinWasmPlayground/KotlinWasmPlayground/build/js/packages/KotlinWasmPlayground-wasm/kotlin/KotlinWasmPlayground-wasm.uninstantiated.mjs"),r=n.dirname(t),s=e.readFileSync(n.resolve(r,c)),i=new WebAssembly.Module(s);o=new WebAssembly.Instance(i,u)}if(l){const e=read(c,"binary"),n=new WebAssembly.Module(e);o=new WebAssembly.Instance(n,u)}m&&(o=(await WebAssembly.instantiateStreaming(fetch(c),u)).instance)}catch(e){if(e instanceof WebAssembly.CompileError){const e=[],n=(n,t,r)=>m?(e.push(t,""),`%c${n}%c`):`[${r}m${n}[m`,t=e=>n(e,"font-weight:bold",1),r=e=>n(e,"text-decoration:underline",4),o=e=>n(e,"font-family:monospace",2);let a=`Using experimental Kotlin/Wasm may require enabling experimental features in the target environment.\n\n- ${t("Chrome")}: enable ${t("WebAssembly Garbage Collection")} at ${r("chrome://flags/#enable-webassembly-garbage-collection")} or run the program with the ${o("--js-flags=--experimental-wasm-gc")} command line argument.\n- ${t("Firefox")}: enable ${t("javascript.options.wasm_function_references")} and ${t("javascript.options.wasm_gc")} at ${r("about:config")}.\n- ${t("Edge")}: run the program with the ${o("--js-flags=--experimental-wasm-gc")} command line argument.\n- ${t("Node.js")}: run the program with the ${o("--experimental-wasm-gc")} command line argument.\n\nFor more information see ${r("https://kotl.in/wasm_help/")}.\n`;if(m)console.error(a,...e);else{const e="\n"+a;"undefined"!=typeof console&&void 0!==console.log?console.log(e):print(e)}}throw e}return s=o.exports,n&&s.__init(),{instance:o,exports:s}}t.d(n,{_:()=>r})}},a={};function s(e){var n=a[e];if(void 0!==n)return n.exports;var t=a[e]={exports:{}};return o[e](t,t.exports,s),t.exports}return e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",n="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",t="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",r=e=>{e&&!e.d&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},s.a=(o,a,s)=>{var i;s&&((i=[]).d=1);var l,m,c,u=new Set,d=o.exports,f=new Promise(((e,n)=>{c=n,m=e}));f[n]=d,f[e]=e=>(i&&e(i),u.forEach(e),f.catch((e=>{}))),o.exports=f,a((o=>{var a;l=(o=>o.map((o=>{if(null!==o&&"object"==typeof o){if(o[e])return o;if(o.then){var a=[];a.d=0,o.then((e=>{s[n]=e,r(a)}),(e=>{s[t]=e,r(a)}));var s={};return s[e]=e=>e(a),s}}var i={};return i[e]=e=>{},i[n]=o,i})))(o);var s=()=>l.map((e=>{if(e[t])throw e[t];return e[n]})),m=new Promise((n=>{(a=()=>n(s)).r=0;var t=e=>e!==i&&!u.has(e)&&(u.add(e),e&&!e.d&&(a.r++,e.push(a)));l.map((n=>n[e](t)))}));return a.r?m:s()}),(e=>(e?c(f[t]=e):m(d),r(i)))),i&&(i.d=0)},s.d=(e,n)=>{for(var t in n)s.o(n,t)&&!s.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},s.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s(641)})()));
//# sourceMappingURL=main.js.map