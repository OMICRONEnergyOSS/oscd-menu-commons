import oscdTooling from '@omicronenergy/oscd-tooling/configs/rollup.config.js';

const [mainConfig, demoConfig] = oscdTooling;

// This package bundles one entry point per exported custom element, rather
// than the single entry point the shared config assumes, so `input` is
// overridden here; every other option (plugins, output, demo bundling) is
// reused as-is from the shared config.
const entries = [
  'oscd-menu-file-close',
  'oscd-menu-file-rename',
  'oscd-menu-new',
  'oscd-menu-open',
  'oscd-menu-redo',
  'oscd-menu-save',
  'oscd-menu-undo',
].map(name => `src/${name}.ts`);

export default [{ ...mainConfig, input: entries }, demoConfig];
