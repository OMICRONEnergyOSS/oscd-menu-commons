[![Tests](https://github.com/OMICRONEnergyOSS/oscd-menu-commons/actions/workflows/test.yml/badge.svg)](https://github.com/OMICRONEnergyOSS/oscd-menu-commons/actions/workflows/test.yml) ![NPM Version](https://img.shields.io/npm/v/@omicronenergy/oscd-menu-commons)

# !!Missing Description!!

## `<oscd-menu-new>`

## What is this?

This is an [OpenSCD](https://openscd.org) plugin. Start up a demo server with `npm run start` and see for yourself!

This package bundles the common file/edit-history menu plugins for OpenSCD:
`oscd-menu-new`, `oscd-menu-open`, `oscd-menu-save`, `oscd-menu-undo`,
`oscd-menu-redo`, `oscd-menu-file-close` and `oscd-menu-file-rename`. Each is
exported both from the package root and from its own subpath (see `exports`
in `package.json`), so consumers can import only the plugins they need.

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

Visual regression tests run separately:

```bash
npm run test:visual
npm run test:update # update the visual baseline
```

## Tooling configs

Lint, build, bundle and test tooling is centralized in
[`@omicronenergy/oscd-tooling`](https://github.com/OMICRONEnergyOSS/oscd-tooling)
and invoked through the `oscd` CLI (see the `scripts` in `package.json`).
`tsconfig.json`, `eslint.config.js` and `rollup.config.js` are thin wrappers
extending `@omicronenergy/oscd-tooling`'s shared configs. `rollup.config.js`
only overrides the main bundle's `input`, since this package bundles multiple
entry points (one per exported custom element) rather than the single entry
point the shared config assumes.

## Local Demo with `web-dev-server`

```bash
npm run start
```

To run a local development server that serves the basic demo located in `demo/index.html`

&copy; 2025 OMICRON electronics GmbH

## License

[Apache-2.0](LICENSE)
