import esbuild from "esbuild";
const IsDev = process.env.ENV === "development";
await esbuild
  .build({
    entryPoints: ["src/app.ts"],
    bundle: true,
    platform: "node",
    target: "node14",
    outfile: IsDev ? "dist/index.cjs" : "dist/index.js",
    minify: true,
    treeShaking: true,
    define: {
      "process.env.ENV": JSON.stringify(IsDev ? "development" : "production"),
    },
  })
  .catch(() => process.exit(1));
