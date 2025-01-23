![ember-autofocus-modifier-illustration](https://gitlab.qonto.co/npm-packages/react-migration-toolkit/uploads/c0af9dd2fe40080b5e340a35f319147e/react-migration-toolkit-banner.png)

# react-migration-toolkit

A set of tools facilitating the migration of Ember components to React components:

- [Ember to React bridge component](https://github.com/qonto/react-migration-toolkit/tree/main/react-migration-toolkit/src/components)
- [React providers](https://github.com/qonto/react-migration-toolkit/tree/main/react-migration-toolkit/src/react/contexts/index.ts)
- [React hooks](https://github.com/qonto/react-migration-toolkit/tree/main/react-migration-toolkit/src/react/hooks/index.ts)
- [React components](https://github.com/qonto/react-migration-toolkit/tree/main/react-migration-toolkit/src/react/components/index.ts)

## Installation

```
ember install react-migration-toolkit
```

## Usage

The main component brought by this addon is the `ReactBridge` Ember component.

It renders React components within Ember templates, permitting progressive UI migration and preserving existing logics and tests.

Full documentation can be found [here](https://www.notion.so/qonto/How-to-use-React-components-in-Ember-applications-e2f8513fc4a442b0967274d9e57b18b0) (Qonto VPN must be on).

[This branch](https://gitlab.qonto.co/front/qonto-js/-/blob/bifrost/app/components/react-bifrost.hbs) uses the ReactBridge extensively and can be checked for reference.

## Basic Example

#### To inject a React component in Ember:

```tsx
// app/react/components/example.tsx

export function Example({ userName }: ExampleProps) {
  return <h1>Hello {userName}!</h1>;
}
```

```js
// app/components/my-ember-component.js

import Component from '@glimmer/component';
import { Example } from 'app/react/components/example.tsx';

export default class MyComponent extends Component {
  reactExample = Example;
}
```

```handlebars
{{! app/components/my-ember-component.hbs }}

<ReactBridge
  @reactComponent={{this.reactExample}}
  @props={{hash userName='John'}}
/>
```

#### More examples can be found in the documentation

- [📕 How to pass custom context providers](https://www.notion.so/qonto/How-to-use-React-components-in-Ember-applications-e2f8513fc4a442b0967274d9e57b18b0?pvs=4#11cb7b02430a4614ac6e355473a2dde4)
- [📕 How to use internationalization](https://www.notion.so/qonto/How-to-use-translations-in-React-in-Ember-components-6719ae3c6a064279a7c8ce8d71810e61)
- [📕 How to use routing](https://www.notion.so/qonto/How-to-use-routing-in-React-in-Ember-components-8ba26839b69e49cc893f302b5dc1a050)
- [📕 How to use Ember services](https://www.notion.so/qonto/How-to-use-Ember-services-in-React-components-d8879e169fec417fb0cdf77e7ecd29ba)
- [📕 How to use feature flags with LaunchDarkly](https://www.notion.so/qonto/How-to-use-feature-flags-in-React-components-ece906bed7b44202a8d3416ccadd7469)
- [📕 How to test React components in Ember](https://www.notion.so/qonto/How-to-test-React-components-in-Ember-3686964be92642cc93f6dd767486cc59)

## Compatibility

- Ember.js v4.12 or above
- Embroider or ember-auto-import v2

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
