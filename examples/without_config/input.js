import base64Wasm from "./my-wasm-library.wasm";

function base64Decode(str) {
    try { // Browser
        return atob(str);
    } catch(err) { // Node
        return Buffer.from(str, "base64");
    }
};

export async function loadMyWasmLibrary() {
  const wasmBytes = base64Decode(base64Wasm);
  const module = await WebAssembly.instantiate(wasmBytes, {});
  // ...
}