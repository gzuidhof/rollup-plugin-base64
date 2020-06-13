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
