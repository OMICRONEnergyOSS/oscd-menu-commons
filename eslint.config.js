import oscdEsLintConfig from '@omicronenergy/oscd-tooling/configs/eslint.config.js';

export default [
  ...oscdEsLintConfig,
  { ignores: ['src/locales.ts', 'src/locales/*'] },
];
