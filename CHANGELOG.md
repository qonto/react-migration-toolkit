# Changelog

## Release (2025-01-16)

@qonto/react-migration-toolkit 1.3.0 (minor)

#### :rocket: Enhancement
* `@qonto/react-migration-toolkit`, `test-app`
  * [#17](https://github.com/qonto/react-migration-toolkit/pull/17) fix(types): allow data-test-* and aria-* props to be passed to the bridge ([@poulet42](https://github.com/poulet42))

#### :house: Internal
* Other
  * [#21](https://github.com/qonto/react-migration-toolkit/pull/21) ci: force signing of commits when preparing release ([@SkoebaSteve](https://github.com/SkoebaSteve))
  * [#18](https://github.com/qonto/react-migration-toolkit/pull/18) feat: run npx create-release-plan-setup@latest ([@SkoebaSteve](https://github.com/SkoebaSteve))
  * [#4](https://github.com/qonto/react-migration-toolkit/pull/4) ci: use dependabot over renovatebot ([@SkoebaSteve](https://github.com/SkoebaSteve))
  * [#2](https://github.com/qonto/react-migration-toolkit/pull/2) Configure GitHub actions ([@SkoebaSteve](https://github.com/SkoebaSteve))
* `test-app`
  * [#3](https://github.com/qonto/react-migration-toolkit/pull/3) ci: setup test github action ([@SkoebaSteve](https://github.com/SkoebaSteve))

#### Committers: 2
- Corentin ([@poulet42](https://github.com/poulet42))
- Steef Janssen ([@SkoebaSteve](https://github.com/SkoebaSteve))

## [1.2.3](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v1.2.2...v1.2.3) (2024-11-26)

### Bug Fixes

- **types:** expose a registry type in template-registry ([cdca8f5](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/cdca8f587bd0ddbbafece970ae2e12f05f6ce2ea))

## [1.2.2](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v1.2.1...v1.2.2) (2024-10-18)

## [1.2.1](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v1.2.0...v1.2.1) (2024-10-15)

### Bug Fixes

- **types:** use optional generic values in react bridge signature ([52c1fd5](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/52c1fd57a332c6229e981543c57cdd04ebc7b021))

# [1.2.0](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v1.1.0...v1.2.0) (2024-10-14)

### Bug Fixes

- **types:** fix [@tag](https://gitlab.qonto.co/tag)Name types, infer attributes and fix yield block types ([05fe736](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/05fe736571b161942cf9627890105b74116ecd98))

### Features

- ** react bridge:** handle safe strings ([2c35ef1](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/2c35ef137e5d7d1ae1b8e7cbda59eb03927b89ef))
- **types:** infer prop types in reactbridge ([5fc42bf](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/5fc42bffebbcada36c6fecb4c9ab9bd589a923f9))

# [1.1.0](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v1.0.0...v1.1.0) (2024-10-02)

### Bug Fixes

- patch glint issue with dynamic tag resolution ([bbc1b57](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/bbc1b57f76a26fc0c2f98f92ccf0b899864c8b64))

### Features

- use intl.\_eventEmitter instead of \_ee to listen for locale changes ([fb8b38d](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/fb8b38d4ca0a286c1ac520483b686f360a5c826b))

# [1.0.0](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.4.2...v1.0.0) (2024-09-24)

### Features

- remove polymorphicIntlProvider in favour of a intlshape consumer like react-intl ([8e7904b0](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/8e7904b0c38c53196caf605e573ae09259425780))

## [0.4.2](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.4.1...v0.4.2) (2024-09-05)

### Bug Fixes

- only render yield wrapper when the has-block helper is truthy ([998b10e](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/998b10eb521223bb39ecd082310dffa3ba607205))

## [0.4.1](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.4.0...v0.4.1) (2024-08-22)

### Bug Fixes

- fix typo in the event name preventing hook to subscribe to locale change ([e547659](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/e54765974bcee3863144edcc52e9e748abd3b024))

# [0.4.0](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.3.0...v0.4.0) (2024-07-30)

### Features

- add formatCountry Intl utility function to Intl hooks return type ([8b298d2](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/8b298d243bc70b2590297a07484627181b017f89))

# [0.3.0](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.2.4...v0.3.0) (2024-07-30)

### Features

- add exists Intl utility function to Intl hooks return type ([a52e6ac](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/a52e6ac9f01398d286a7ea4728b3343f42c85c6c))

## [0.2.4](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.2.3...v0.2.4) (2024-07-30)

## [0.2.3](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.2.2...v0.2.3) (2024-07-29)

### Bug Fixes

- wrap cleanup function in act ([76ac621](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/76ac621499f453f0c5fa389e55f7f1331dd2a9dd))

## [0.2.2](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.2.1...v0.2.2) (2024-07-16)

### Features

- add the ability to pass a dynamic tagName replacing the default div ([320144d9](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/-/commit/320144d9511e2339d1fe8477fba4363abc00aeb0))

## [0.2.1](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.2.0...v0.2.1) (2024-06-17)

# [0.2.0](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.1.0...v0.2.0) (2024-05-23)

### Features

- add the ability to pass attributes to the react-bifrost element ([8a6754a](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/8a6754a4f67d301cc4f2ab99717bae50cd5871ce))

# [0.1.0](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.0.6...v0.1.0) (2024-04-30)

### Features

- add formatNumber to useEmberIntl ([3451aed](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/commit/3451aede54771b52762ab728ef23b047e9e8a1c0))

## [0.0.6](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.0.5...v0.0.6) (2024-04-04)

## [0.0.5](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.0.4...v0.0.5) (2024-04-04)

## [0.0.4](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.0.3...v0.0.4) (2024-04-04)

## [0.0.3](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.0.2...v0.0.3) (2024-04-04)

## [0.0.2](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/compare/v0.0.1...v0.0.2) (2024-04-03)

## 0.0.1 (2024-04-03)
