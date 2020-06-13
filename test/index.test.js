const assert = require("assert");
const { rollup } = require("rollup");
const { base64 } = require("../");

process.chdir("test");

describe("rollup-plugin-base64", () => {
  it("should base64 encode image", () => {
    return rollup({
      input: "fixtures/image.js",
      plugins: [base64({ include: "**/*.jpg" })]
    })
      .then(bundle => bundle.generate({ format: "iife"}))
      .then(({output}) => {
        new Function("assert", output[0].code)(assert);
      });
  });

  it("should base64 wasm and run", () => {
    return rollup({
      input: "fixtures/wasm.js",
      plugins: [base64({ include: "**/*.wasm" })]
    })
      .then(bundle => bundle.generate({ format: "iife"}))
      .then(({ output }) => {
        new Function("assert", output[0].code)(assert);
      });
  });

  it("throws when include is not specified", () => {
    assert.throws(() => {
      rollup({
        plugins: [base64()]
      });
    }, /include option must be specified/);
  });
});
