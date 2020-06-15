const { createFilter } = require("@rollup/pluginutils");
const {readFileSync} = require("fs");

function base64(opts = {}) {
  if (!opts.include) {
    throw Error("include option must be specified");
  }

  const filter = createFilter(opts.include, opts.exclude);
  return {
    name: "base64",
    transform(data, id) {
      if (filter(id)) {
        const fileData = readFileSync(id);
          return  `export default "${fileData.toString('base64')}";`
      }
    }
  };
}

exports.base64 = base64;