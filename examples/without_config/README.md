You will need base64 globally installed to run this example, I recommend you use a `rollup.config.js` instead.

To build `output.js`:

```
rollup  -p 'base64={include: "**/*.wasm"}' -i input.js -f es -o output.js
```
