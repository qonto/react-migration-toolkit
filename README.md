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

The native Bridge can be used as is for simple components. Multiple bridges can be injected within a same template.

## Basic Example

### To inject a React component in Ember:

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

### Content projection - <children>

The React Bridge accepts yielded values, which can be accessed via the `children` prop on the React side.

```html
<ReactBridge
  @reactComponent="{{this.reactExample}}"
  @props="{{hash"
  text="this.props.text}}"
>
  <p>Hello World!</p>
</ReactBridge>
```

```tsx
function ReactExample({ children, text }: ReactExampleProps) {
  return (
    <div>
      <h1>{text}</h1>
      {children} // <p>Hello World!</p>
    </div>
  );
}
```

⚠️ Using yielded values does come with some risks. What is supported so far:

✅ Passing Ember helpers works

```html
<ReactBridge
  @reactComponent="{{this.reactExample}}"
  @props="{{hash"
  text="this.props.text}}"
>
  {{format/iban @iban}}
</ReactBridge>
```

❌ Directly nesting conditions cause an error:
```shell
Failed to execute 'removeChild' on 'Node'
```

```html
<ReactBridge
  @reactComponent="{{this.reactExample}}"
  @props="{{hash"
  text="this.props.text}}"
>
  {{#if this.someCondition}}
    {{t "some-text"}} 
  {{else}} 
    {{t "some-other-text"}}
  {{/if}}
</ReactBridge>
```

✅ Wrap conditions in an html element

```html
<ReactBridge
  @reactComponent="{{this.reactExample}}"
  @props="{{hash"
  text="this.props.text}}"
>
  <div>
    {{#if this.someCondition}}
      {{t "some-text"}} 
    {{else}} 
      {{t "some-other-text"}}
    {{/if}}
  </div>
</ReactBridge>
```

⚠️ Be careful with nesting Ember components in a ReactBridge. It's hard to debug when you have issues.

```html
<ReactBridge
  @reactComponent="{{this.reactExample}}"
  @props="{{hash"
  text="this.props.text}}"
>
  <SomeEmberComponent />
</ReactBridge>
```

⚠️ Similarly, we recommend not nesting bridges.

```html
<ReactBridge
  @reactComponent="{{this.reactExample}}"
  @props="{{hash"
  text="this.props.text}}"
>
  <ReactBridge
    @reactComponent="{{this.someReactComponent}}"
  />
</ReactBridge>
```

✅ Consider migrating both components at the same time, returning just a React component.

```html
<ReactBridge
  @reactComponent="{{this.reactExampleWithEmberComponent}}"
  @props="{{hash"
  text="this.props.text}}"
/>
```

### Sharing context between Ember and React

It is also flexible enough to allow custom providers when shared context is needed between Ember and React. In that situation, creating an adapter around the native Bridge is required.

It is as simple as passing `providerOptions` as an argument to the `ReactBridge`

An example is provided in the test app:

- the [customProviders arg](https://github.com/qonto/react-migration-toolkit/blob/main/test-app/app/components/example-routing.hbs)
- [enabling these custom providers in React](https://github.com/qonto/react-migration-toolkit/blob/main/test-app/app/react/custom-providers.tsx).

> 💡 In practice, you probably want to create a <ReactBridgeWithProviders> wrapper that hooks up your most common providers. For example, `intl`, common services, and routing.

### How to test React components in Ember

Like any other Ember component, the ReactBridge can be rendered in QUnit and asserted on. This method is ideal to test React components in isolation.

```javascript
import { WelcomeMessage } from 'qonto/react/component/welcome-message';

module('my component test', function () {
  test('It renders properly', async function (assert) {
    this.setProperties({ userName: 'Jane Doe' });
    this.reactWelcomeMessage = WelcomeMessage;

    await render(
      hbs`<ReactBridge
        @reactComponent={{this.reactWelcomeMessage}}
        @props={{hash
          cardLevel=this.userName
        }}
      />`,
    );

    assert.dom('h1').hasText('Welcome Jane Doe!');
  });
});
```

If you need custom providers, they require the same setup as your Ember components:

```javascript
import { WelcomeMessage } from 'qonto/react/component/welcome-message';
import { setupIntl } from 'ember-intl';

module('my component test', function (hooks) {
  setupIntl(hooks);
  test('It renders properly', async function (assert) {
    this.setProperties({ userName: 'Jane Doe' });
    this.reactWelcomeMessage = WelcomeMessage;
    this.setupIntl();

    await render(
      hbs`<ReactBridge
        @reactComponent={{this.reactWelcomeMessage}}
        @props={{hash
          cardLevel=this.userName
        }}
      />`,
    );

    assert.dom('h1').hasText('Welcome Jane Doe!');
  });
});
```

## Typescript Usage

The react-bridge has proper Glint types, which allow you when using TypeScript to get strict type checking in your templates.

Unless you are using strict mode templates (via first class component templates), you need to import the addon's Glint template registry and extend your app's registry declaration as described in the Using Addons documentation:

import '@glint/environment-ember-loose';

import type ReactMigrationToolkitRegistry from '@qonto/react-migration-toolkit/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry 
    extends ReactMigrationToolkitRegistry {}
}


## Compatibility

- Ember.js v4.12 or above
- Embroider or ember-auto-import v2

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
