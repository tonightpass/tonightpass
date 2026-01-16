import { defineConfig, type Options } from "tsup";

const config: Options = {
  format: ["cjs", "esm"],
  entry: ["src/index.ts"],
  splitting: true,
  sourcemap: true,
  clean: false,
  platform: "neutral",
  minify: true,
  treeshake: true,
  dts: true,
};

export default defineConfig(config);
