const path = require("path");
const rollup = require("rollup");
const uglify = require("rollup-plugin-uglify-es");
const babel = require("rollup-plugin-babel");

const useES5 = process.argv.includes("--es5");
const plugins = useES5 ? [babel(), uglify()] : [uglify()];
const filename = useES5 ? "ducker.es5.js" : "ducker.js";

async function build() {
  const bundle = await rollup.rollup({
    input: path.join(__dirname, "/src/ducker.js"),
    plugins
  });

  await bundle.write({
    format: "umd",
    name: "ducker",
    file: path.join(__dirname, `/dist/${filename}`)
  });
}

build();
