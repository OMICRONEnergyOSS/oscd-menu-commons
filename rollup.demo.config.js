import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import copy from 'rollup-plugin-copy';
import fs from 'fs';

const tsconfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf8'));
const demoTsconfig = {
  ...tsconfig,
  compilerOptions: { ...tsconfig.compilerOptions, outDir: 'dist/demo' },
  exclude: ['**/*.test.ts', '**/*.spec.ts'],
};

// Demo bundle configuration - expects main bundle to already exist
export default {
  input: 'demo/index.html',
  plugins: [
    html({
      input: 'demo/index.html',
      minify: true,
    }),
    nodeResolve({
      preferBuiltins: false,
      browser: true,
    }),
    typescript(demoTsconfig),
    importMetaAssets(),
    copy({
      targets: [
        { src: 'demo/sample.scd', dest: 'dist/demo' },
        { src: 'demo/*.js', dest: 'dist/demo' },
      ],
      verbose: true,
      flatten: false,
    }),
  ],
  output: {
    dir: 'dist/demo',
    format: 'es',
    sourcemap: true,
  },
};
