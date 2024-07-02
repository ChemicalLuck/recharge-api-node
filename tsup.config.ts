import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  minify: true,
  dts: true,
  format: ["cjs", "esm"],
  target: "node14",
  outDir: "dist",
  clean: true
});
