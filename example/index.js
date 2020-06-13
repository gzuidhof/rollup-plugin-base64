import wasmB64 from "./add.wasm";

// This works in Node, in the browser you will need to convert from base64 with a different method.
const wasmBytes = Buffer.from(wasmB64, "base64");

// Note: synchronous loading is only recommended for very small binaries, please replace
// this with your favorite (asynchronous) WASM module loader code).
const mod = new WebAssembly.Module(wasmBytes);
const instance = new WebAssembly.Instance(mod, {});

const addResult = instance.exports.add(12, 34);
console.log(addResult); // 46
