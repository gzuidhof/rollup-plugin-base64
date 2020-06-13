# rollup-plugin-base64

A [**Rollup**](https://rollupjs.org/) plugin to load any file as a base64 string. This is especially useful for embedding WebAssembly programs into your code so no additional `.wasm` file needs to be loaded.

Note that with base64 encoding the size of the input file will be increased by around 33%.

## Usage

A minimum example of code using a WASM function that adds two numbers together.

### The input files

```javascript
// rollup.json
const { base64 } = require("rollup-plugin-base64");

export default {
    input: "index.js",
    output: {
        file: "build.js", format: 'iife'
    },
    plugins: [
        base64({ include: "**/*.wasm" })
    ]
};
```

```javascript
// index.js
import wasmB64 from "./add.wasm";

// This works in Node, in the browser you will need to convert from base64 with a different method.
const wasmBytes = Buffer.from(wasmB64, "base64");

// Note: synchronous loading is only recommended for very small binaries, please replace
// this with your favorite (asynchronous) WASM module loader code).
const mod = new WebAssembly.Module(wasmBytes);
const instance = new WebAssembly.Instance(mod, {});

const addResult = instance.exports.add(12, 34);
console.log(addResult); // 46
```

### The output
```javascript
// build.js
(function () {
	'use strict';

	var wasmB64 = "AGFzbQEAAAABBwFgAn9/AX8DAgEABwcBA2FkZAAACgkBBwAgACABags=";

	// This works in Node, in the browser you will need to convert from base64 with a different method.
	const wasmBytes = Buffer.from(wasmB64, "base64");

	// Note: synchronous loading is only recommended for very small binaries, please replace
	// this with your favorite (asynchronous) WASM module loader code).
	const mod = new WebAssembly.Module(wasmBytes);
	const instance = new WebAssembly.Instance(mod, {});

	const addResult = instance.exports.add(12, 34);
	console.log(addResult); // 46

}());
```

Simples. Let's try it:
```
$ node build.js
46
```

This example can be found in the `example` folder.

## Configuration

You can specify which files to apply base64ing to by specifying the `include` and `exclude` field in the config object. `include` is required, if you leave it out an error will be thrown.
