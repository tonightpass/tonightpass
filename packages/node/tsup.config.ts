import { esbuildDecorators } from "@anatine/esbuild-decorators";
import { defineConfig, Options } from "tsup";

const config: Options = {
  format: ["cjs", "esm"],
  entry: ["src/index.ts"],
  splitting: true,
  sourcemap: true,
  clean: false,
  platform: "node",
  minify: true,
  treeshake: true,
  dts: true,
  esbuildPlugins: [esbuildDecorators()],
};

export default defineConfig(config);
