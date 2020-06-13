const { createFilter } = require("@rollup/pluginutils");

function base64(opts = {}) {
  if (!opts.include) {
    throw Error("include option must be specified");
  }

  const filter = createFilter(opts.include, opts.exclude);
  return {
    name: "base64",

    transform(data, id) {
      if (filter(id)) {
          return  `export default "${Buffer.from(data).toString('base64')}";`
      }
    }
  };
}

exports.base64 = base64;