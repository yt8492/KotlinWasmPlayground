
export async function instantiate(imports={}, runInitializer=true) {
    const externrefBoxes = new WeakMap();
    // ref must be non-null
    function tryGetOrSetExternrefBox(ref, ifNotCached) {
        if (typeof ref !== 'object') return ifNotCached;
        const cachedBox = externrefBoxes.get(ref);
        if (cachedBox !== void 0) return cachedBox;
        externrefBoxes.set(ref, ifNotCached);
        return ifNotCached;
    }
    
    async function _importModule(x) { 
        return imports[x] ?? await import(x);
    }


    
    const js_code = {
        'kotlin.captureStackTrace_-1527000587' : () => new Error().stack,
        'kotlin.wasm.internal.throwJsError_241251258' : (message, wasmTypeName, stack) => { 
                const error = new Error();
                error.message = message;
                error.name = wasmTypeName;
                error.stack = stack;
                throw error;
           },
        'kotlin.wasm.internal.getJsEmptyString_-356509403' : () => '',
        'kotlin.wasm.internal.getJsTrue_-1670225033' : () => true,
        'kotlin.wasm.internal.getJsFalse_1285860896' : () => false,
        'kotlin.wasm.internal.stringLength_-1711984102' : x => x.length,
        'kotlin.wasm.internal.jsExportStringToWasm_-764483699' :  (src, srcOffset, srcLength, dstAddr) => {
                const mem16 = new Uint16Array(wasmExports.memory.buffer, dstAddr, srcLength);
                let arrayIndex = 0;
                let srcIndex = srcOffset;
                while (arrayIndex < srcLength) {
                    mem16.set([src.charCodeAt(srcIndex)], arrayIndex);
                    srcIndex++;
                    arrayIndex++;
                }
            }
        ,
        'kotlin.wasm.internal.newJsArray_2038538740' : () => [],
        'kotlin.wasm.internal.jsArrayPush_1062523760' : (array, element) => { array.push(element); },
        'kotlin.wasm.internal.importStringFromWasm_-1852552787' : (address, length, prefix) => {
            const mem16 = new Uint16Array(wasmExports.memory.buffer, address, length);
            const str = String.fromCharCode.apply(null, mem16);
            return (prefix == null) ? str : prefix + str;
        }
        ,
        'kotlin.wasm.internal.externrefToString_-951601593' : ref => String(ref),
        'kotlin.wasm.internal.externrefEquals_1929080772' : (lhs, rhs) => lhs === rhs,
        'kotlin.wasm.internal.externrefHashCode_-1529105245' : 
        (() => {
        const dataView = new DataView(new ArrayBuffer(8));
        function numberHashCode(obj) {
            if ((obj | 0) === obj) {
                return obj | 0;
            } else {
                dataView.setFloat64(0, obj, true);
                return (dataView.getInt32(0, true) * 31 | 0) + dataView.getInt32(4, true) | 0;
            }
        }
        
        const hashCodes = new WeakMap();
        function getObjectHashCode(obj) {
            const res = hashCodes.get(obj);
            if (res === undefined) {
                const POW_2_32 = 4294967296;
                const hash = (Math.random() * POW_2_32) | 0;
                hashCodes.set(obj, hash);
                return hash;
            }
            return res;
        }
        
        function getStringHashCode(str) {
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
                var code  = str.charCodeAt(i);
                hash  = (hash * 31 + code) | 0;
            }
            return hash;
        }
        
        return (obj) => {
            if (obj == null) {
                return 0;
            }
            switch (typeof obj) {
                case "object":
                case "function":
                    return getObjectHashCode(obj);
                case "number":
                    return numberHashCode(obj);
                case "boolean":
                    return obj;
                default:
                    return getStringHashCode(String(obj)); 
            }
        }
        })(),
        'kotlin.wasm.internal.isNullish_1738527798' : (ref) => ref == null,
        'kotlin.wasm.internal.tryGetOrSetExternrefBox_$external_fun_64599960' : (p0, p1) => tryGetOrSetExternrefBox(p0, p1),
        'kotlin.js.dynamicGetAny_881217544' : (obj, index) => obj[index],
        'kotlin.io.printlnImpl_-1030976236' : (message) => console.log(message),
        'kotlin.js.__callJsClosure_vjdw83_-1595539616' : (f, p0) => f(p0),
        'kotlin.js.__callJsClosure_jh6aw8_2095731501' : (f, p0) => f(p0),
        'kotlin.js.__convertKotlinClosureToJsClosure_wa1ql8_-1506129926' : (f) => () => wasmExports.__callFunction_wa1ql8(f, ),
        'kotlin.random.initialSeed_-1139101152' : () => ((Math.random() * Math.pow(2, 32)) | 0),
        'kotlinx.browser.window_$external_prop_getter_-825038626' : () => window,
        'kotlinx.browser.document_$external_prop_getter_-106098477' : () => document,
        'org.w3c.dom.length_$external_prop_getter_-1872258745' : (_this) => _this.length,
        'org.w3c.dom.clipboard.__convertKotlinClosureToJsClosure_4t1ncd_-442670194' : (f) => (p0) => wasmExports.__callFunction_4t1ncd(f, p0),
        'org.w3c.dom.css.setProperty_$external_fun_1734298686' : (_this, p0, p1, p2, isDefault0) => _this.setProperty(p0, p1, isDefault0 ? undefined : p2, ),
        'org.w3c.dom.css.style_$external_prop_getter_587302038' : (_this) => _this.style,
        'org.w3c.dom.events.addEventListener_$external_fun_1747931580' : (_this, p0, p1, p2, isDefault0) => _this.addEventListener(p0, p1, isDefault0 ? undefined : p2, ),
        'org.w3c.dom.events.removeEventListener_$external_fun_1762166175' : (_this, p0, p1, p2, isDefault0) => _this.removeEventListener(p0, p1, isDefault0 ? undefined : p2, ),
        'org.w3c.dom.events.type_$external_prop_getter_1452333404' : (_this) => _this.type,
        'org.w3c.dom.events.target_$external_prop_getter_376780965' : (_this) => _this.target,
        'org.w3c.dom.events.currentTarget_$external_prop_getter_-1048490452' : (_this) => _this.currentTarget,
        'org.w3c.dom.events.eventPhase_$external_prop_getter_-1245958176' : (_this) => _this.eventPhase,
        'org.w3c.dom.events.bubbles_$external_prop_getter_419664161' : (_this) => _this.bubbles,
        'org.w3c.dom.events.cancelable_$external_prop_getter_2074147732' : (_this) => _this.cancelable,
        'org.w3c.dom.events.defaultPrevented_$external_prop_getter_1109341682' : (_this) => _this.defaultPrevented,
        'org.w3c.dom.events.composed_$external_prop_getter_1973664406' : (_this) => _this.composed,
        'org.w3c.dom.events.isTrusted_$external_prop_getter_-1858347429' : (_this) => _this.isTrusted,
        'org.w3c.dom.events.timeStamp_$external_prop_getter_-592242199' : (_this) => _this.timeStamp,
        'org.w3c.dom.events.Event_$external_class_instanceof_1405976461' : (x) => x instanceof Event,
        'org.w3c.dom.events.screenX_$external_prop_getter_-1431335696' : (_this) => _this.screenX,
        'org.w3c.dom.events.screenY_$external_prop_getter_-1686072241' : (_this) => _this.screenY,
        'org.w3c.dom.events.clientX_$external_prop_getter_2038959055' : (_this) => _this.clientX,
        'org.w3c.dom.events.clientY_$external_prop_getter_1784222510' : (_this) => _this.clientY,
        'org.w3c.dom.events.ctrlKey_$external_prop_getter_-228748081' : (_this) => _this.ctrlKey,
        'org.w3c.dom.events.shiftKey_$external_prop_getter_874036390' : (_this) => _this.shiftKey,
        'org.w3c.dom.events.altKey_$external_prop_getter_1849068429' : (_this) => _this.altKey,
        'org.w3c.dom.events.metaKey_$external_prop_getter_542580457' : (_this) => _this.metaKey,
        'org.w3c.dom.events.button_$external_prop_getter_1865140074' : (_this) => _this.button,
        'org.w3c.dom.events.buttons_$external_prop_getter_730691003' : (_this) => _this.buttons,
        'org.w3c.dom.events.relatedTarget_$external_prop_getter_1300868117' : (_this) => _this.relatedTarget,
        'org.w3c.dom.events.pageX_$external_prop_getter_-1845892687' : (_this) => _this.pageX,
        'org.w3c.dom.events.pageY_$external_prop_getter_-2100629232' : (_this) => _this.pageY,
        'org.w3c.dom.events.x_$external_prop_getter_-1731407998' : (_this) => _this.x,
        'org.w3c.dom.events.y_$external_prop_getter_-1986144543' : (_this) => _this.y,
        'org.w3c.dom.events.offsetX_$external_prop_getter_-947552843' : (_this) => _this.offsetX,
        'org.w3c.dom.events.offsetY_$external_prop_getter_-1202289388' : (_this) => _this.offsetY,
        'org.w3c.dom.requestAnimationFrame_$external_fun_-397503097' : (_this, p0) => _this.requestAnimationFrame(p0),
        'org.w3c.dom.__convertKotlinClosureToJsClosure_e64igx_218911805' : (f) => (p0) => wasmExports.__callFunction_e64igx(f, p0),
        'org.w3c.dom.HTMLElement_$external_class_instanceof_1141286243' : (x) => x instanceof HTMLElement,
        'org.w3c.dom.add_$external_fun_124764036' : (_this, p0) => _this.add(...p0),
        'org.w3c.dom.classList_$external_prop_getter_483424870' : (_this) => _this.classList,
        'org.w3c.dom.setAttribute_$external_fun_-10099328' : (_this, p0, p1) => _this.setAttribute(p0, p1),
        'org.w3c.dom.removeAttribute_$external_fun_-1046638991' : (_this, p0) => _this.removeAttribute(p0),
        'org.w3c.dom.Element_$external_class_instanceof_861511534' : (x) => x instanceof Element,
        'org.w3c.dom.createElement_$external_fun_315804656' : (_this, p0, p1, isDefault0) => _this.createElement(p0, isDefault0 ? undefined : p1, ),
        'org.w3c.dom.createTextNode_$external_fun_783836905' : (_this, p0) => _this.createTextNode(p0),
        'org.w3c.dom.getElementById_$external_fun_303033340' : (_this, p0) => _this.getElementById(p0),
        'org.w3c.dom.childNodes_$external_prop_getter_-982569715' : (_this) => _this.childNodes,
        'org.w3c.dom.cloneNode_$external_fun_1003356427' : (_this, p0, isDefault0) => _this.cloneNode(isDefault0 ? undefined : p0, ),
        'org.w3c.dom.insertBefore_$external_fun_56083325' : (_this, p0, p1) => _this.insertBefore(p0, p1),
        'org.w3c.dom.appendChild_$external_fun_1819279683' : (_this, p0) => _this.appendChild(p0),
        'org.w3c.dom.removeChild_$external_fun_-1356133203' : (_this, p0) => _this.removeChild(p0),
        'org.w3c.dom.Text_$external_class_instanceof_1058512351' : (x) => x instanceof Text,
        'org.w3c.dom.data_$external_prop_setter_1909535180' : (_this, v) => _this.data = v,
        'org.w3c.dom.svg.SVGElement_$external_class_instanceof_690839412' : (x) => x instanceof SVGElement,
        'kotlinx.coroutines.setTimeout_$external_fun_936906613' : (p0, p1) => setTimeout(p0, p1),
        'org.jetbrains.compose.web.internal.runtime.jsCreateEventListener_2043309049' : handleEvent => ({ handleEvent }),
        'org.jetbrains.compose.web.movementX_$external_prop_getter_-983443098' : (_this) => _this.movementX,
        'org.jetbrains.compose.web.movementY_$external_prop_getter_-1238179643' : (_this) => _this.movementY,
        'org.jetbrains.compose.web.dom.removeNeededAttrs_-752452336' :  (node) => {
                    const names = node.getAttributeNames()
                    for (const n of names) {
                        if (n != 'style' && n != 'class') {
                            node.removeAttribute(n);
                        }
                    }
            }
        
    }
    
    // Placed here to give access to it from externals (js_code)
    let wasmInstance;
    let require; 
    let wasmExports;

    const isNodeJs = (typeof process !== 'undefined') && (process.release.name === 'node');
    const isStandaloneJsVM =
        !isNodeJs && (
            typeof d8 !== 'undefined' // V8
            || typeof inIon !== 'undefined' // SpiderMonkey
            || typeof jscOptions !== 'undefined' // JavaScriptCore
        );
    const isBrowser = !isNodeJs && !isStandaloneJsVM && (typeof window !== 'undefined');
    
    if (!isNodeJs && !isStandaloneJsVM && !isBrowser) {
      throw "Supported JS engine not detected";
    }
    
    const wasmFilePath = './KotlinWasmPlayground-wasm.wasm';
    const importObject = {
        js_code,

    };
    
    try {
      if (isNodeJs) {
        const module = await import(/* webpackIgnore: true */'node:module');
        require = module.default.createRequire(import.meta.url);
        const fs = require('fs');
        const path = require('path');
        const url = require('url');
        const filepath = url.fileURLToPath(import.meta.url);
        const dirpath = path.dirname(filepath);
        const wasmBuffer = fs.readFileSync(path.resolve(dirpath, wasmFilePath));
        const wasmModule = new WebAssembly.Module(wasmBuffer);
        wasmInstance = new WebAssembly.Instance(wasmModule, importObject);
      }
      
      if (isStandaloneJsVM) {
        const wasmBuffer = read(wasmFilePath, 'binary');
        const wasmModule = new WebAssembly.Module(wasmBuffer);
        wasmInstance = new WebAssembly.Instance(wasmModule, importObject);
      }
      
      if (isBrowser) {
        wasmInstance = (await WebAssembly.instantiateStreaming(fetch(wasmFilePath), importObject)).instance;
      }
    } catch (e) {
      if (e instanceof WebAssembly.CompileError) {
        const styles = [];
        const styled = (t, css, escSeq) => isBrowser ? (styles.push(css, /* reset */""), `%c${t}%c`) : `\x1b[${escSeq}m${t}\x1b[m`;
        const name = t => styled(t, "font-weight:bold", 1);
        const uri = t => styled(t, "text-decoration:underline", 4);
        const cli = t => styled(t, "font-family:monospace", 2);
        
        let text = `Using experimental Kotlin/Wasm may require enabling experimental features in the target environment.

- ${name("Chrome")}: enable ${name("WebAssembly Garbage Collection")} at ${uri("chrome://flags/#enable-webassembly-garbage-collection")} or run the program with the ${cli("--js-flags=--experimental-wasm-gc")} command line argument.
- ${name("Firefox")}: enable ${name("javascript.options.wasm_function_references")} and ${name("javascript.options.wasm_gc")} at ${uri("about:config")}.
- ${name("Edge")}: run the program with the ${cli("--js-flags=--experimental-wasm-gc")} command line argument.
- ${name("Node.js")}: run the program with the ${cli("--experimental-wasm-gc")} command line argument.

For more information see ${uri("https://kotl.in/wasm_help/")}.
`;
        if (isBrowser) {
          console.error(text, ...styles);
        } else {
          const t = "\n" + text;
          if (typeof console !== "undefined" && console.log !== void 0) 
            console.log(t);
          else 
            print(t);
        }
      }
      throw e;
    }
    
    wasmExports = wasmInstance.exports;
    if (runInitializer) {
        wasmExports.__init();
    }

    return { instance: wasmInstance,  exports: wasmExports };
}
