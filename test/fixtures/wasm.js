import wasmB64 from "./add.wasm";

assert.equal(typeof wasmB64, "string");

const wasmBytes = Buffer.from(wasmB64, "base64");

// Synchronously load wasm module
const mod = new WebAssembly.Module(wasmBytes);
const instance = new WebAssembly.Instance(mod, {});

const addResult = instance.exports.add(123, 234);
assert.equal(addResult, 357);
