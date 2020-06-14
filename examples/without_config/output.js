var base64Wasm = "AGFzbQEAAAABBwFgAn9/AX8DAgEABwcBA2FkZAAACgkBBwAgACABags=";

function base64Decode(str) {
    try { // Browser
        return atob(str);
    } catch(err) { // Node
        return Buffer.from(str, "base64");
    }
}
async function loadMyWasmLibrary() {
  const wasmBytes = base64Decode(base64Wasm);
  const module = await WebAssembly.instantiate(wasmBytes, {});
  // ...
}

export { loadMyWasmLibrary };
