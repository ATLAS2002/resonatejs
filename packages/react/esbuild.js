const { build } = require("esbuild");

build({
  entryPoints: ["./src/**/*.ts", "./src/**/*.tsx"],
  sourcemap: true,
  outdir: "dist",
  target: ["chrome58", "firefox57", "safari11"],
}).catch(() => process.exit(1));
