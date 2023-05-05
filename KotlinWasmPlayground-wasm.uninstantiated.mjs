
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
        'kotlin.captureStackTrace_-1334956621' : () => new Error().stack,
        'kotlin.wasm.internal.throwJsError_-385587655' : (message, wasmTypeName, stack) => { 
                const error = new Error();
                error.message = message;
                error.name = wasmTypeName;
                error.stack = stack;
                throw error;
           },
        'kotlin.wasm.internal.getJsEmptyString_-164465437' : () => '',
        'kotlin.wasm.internal.getJsTrue_-1478181067' : () => true,
        'kotlin.wasm.internal.getJsFalse_1477904862' : () => false,
        'kotlin.wasm.internal.stringLength_1772554682' : x => x.length,
        'kotlin.wasm.internal.jsExportStringToWasm_271128330' :  (src, srcOffset, srcLength, dstAddr) => {
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
        'kotlin.wasm.internal.importStringFromWasm_-1434832627' : (address, length, prefix) => {
            const mem16 = new Uint16Array(wasmExports.memory.buffer, address, length);
            const str = String.fromCharCode.apply(null, mem16);
            return (prefix == null) ? str : prefix + str;
        }
        ,
        'kotlin.wasm.internal.externrefToString_871258856' : ref => String(ref),
        'kotlin.wasm.internal.externrefHashCode_1955433539' : 
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
        'kotlin.wasm.internal.isNullish_955678453' : (ref) => ref == null,
        'kotlin.wasm.internal.tryGetOrSetExternrefBox_$external_fun_903163830' : (p0, p1) => tryGetOrSetExternrefBox(p0, p1),
        'kotlin.js.__callJsClosure_o0vpnl_-332838811' : (f, p0) => f(p0),
        'kotlin.js.__callJsClosure_vhne0b_-1225296359' : (f, p0) => f(p0),
        'kotlin.random.initialSeed_714621149' : () => ((Math.random() * Math.pow(2, 32)) | 0),
        'kotlinx.browser.document_$external_prop_getter_85945489' : () => document,
        'org.w3c.dom.body_$external_prop_getter_-1797460166' : (_this) => _this.body,
        'org.w3c.dom.createTextNode_$external_fun_1649979942' : (_this, p0) => _this.createTextNode(p0),
        'org.w3c.dom.ownerDocument_$external_prop_getter_1104418837' : (_this) => _this.ownerDocument,
        'org.w3c.dom.appendChild_$external_fun_-1637123743' : (_this, p0) => _this.appendChild(p0)
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
