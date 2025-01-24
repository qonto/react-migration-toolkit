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

The main component brought by this add-on is the `ReactBridge` Ember component.

`ReactBridge` renders React components within Ember templates, permitting progressive UI migration and preserving existing logics and tests.

It can be used as is for simple components. Multiple bridges can be injected within a same template (👀 [see example](https://gitlab.qonto.co/front/qonto-js/-/blob/bifrost/app/components/card-sidebar/main.hbs#L17-71)).

```html
<ReactBridge @reactComponent={{this.reactExample}} />
```

It is also flexible enough to allow custom providers when shared context is needed between Ember and React. In that situation, creating an adapter around the native Bridge is required.

### `ReactBridge` component API

| Property            | Type                                      | Required | Default |
|---------------------|-------------------------------------------|----------|---------|
| reactComponent      | ComponentType                            | Yes      | None    |
| props               | object                                   | No       | None    |
| providersComponent  | ComponentType<{ children: ReactNode } & P> | No       | None    |
| tagName             | HTMLElement (string)                     | No       | “div”   |

#### `reactComponent`

Requires a React component.

```jsx
import Component from '@glimmer/component';
import { Example } from 'app/react/example.tsx';

export default class MyComponent extends Component {
  reactExample = Example;
}
```

```html
<ReactBridge @reactComponent={{this.reactExample}} />
```

#### `props` (optional)

If you need to pass down arguments to your React component, you can do it as follows. They will be consumed as `props` on the React side.

```jsx
@tracked props = { text: 'props content' };
```

```html
<ReactBridge
  @reactComponent={{this.reactExample}}
  @props={{this.props}}
/>
```

```jsx
function Example({text}: ExampleProps) {
	return <p>{text}</p>
}
```

The `props` property accepts any object, the `hash` helper can also be used:

```html
<ReactBridge
  @reactComponent={{this.reactExample}}
	@props={{hash text="Hello World"}}
/>
```

#### `component` prop


The Ember application state can be accessed within React components.

In some cases, additional providers may be required to support your application's functionality. For example, the toolkit provides the following providers and associated hooks:

- `RawIntlProvider` (for `react-intl`) → `useIntl` (requires passing the Ember `intl` instance from `useEmberIntl`)
- `PolymorphicRouterContextProvider` → `useRouter`
- `LDProvider` (LaunchDarkly) → `useFlags`

You can also create your own context providers and pass them to the React Bridge in a similar fashion.

These should be grouped into a `CustomProviders` React component and passed to the Bridge provider options like so:

```jsx
@providerOptions={{hash
	component=this.reactCustomProvidersComponent
}}
```

```tsx
import { RawIntlProvider } from 'react-intl';

function CustomProviders({ children, ldFlags }: CustomProvidersProps) {
  const intl = useEmberIntl();
  const router = useEmberRouter();

  return (
    <LDProvider ldFlags={ldFlags}>
      <PolymorphicRouterContextProvider router={router}>
          <RawIntlProvider value={intl}>
                  {children}
          </RawIntlProvider>
      </PolymorphicRouterContextProvider>
    </LDProvider>
  );
}
```

#### `props` prop

Object passed to the custom providers defined above. This allows the providers to consume Ember values and react to them.

Taking the above example, the `CustomProviders` component receives a `ldFlag` prop.

```tsx
function CustomProviders({ children, ldFlags }) {...}
```

This means the React Bridge will re-render every time the flags object updates. Since the values come from Ember, they have to be passed via the `providerOptions` .

```jsx
@providerOptions={{hash
	component=this.reactCustomProvidersComponent
	props=(hash
		ldFlags=this.launchdarkly.allFlags
	)
}}
```

#### `tagName` prop

By default, the bridge will wrap the React component in a `div` which sometimes breaks the semantic flow. For example, a `table` cannot have a `div` element as a child. With this, we can to set another tag dynamically to wrap the react component which solves this problem.

```html
<ReactBridge
  @reactComponent={{this.reactExample}}
  @tagName="tr"
/>
```

#### Content projection

The `ReactBridge` accepts yielded values, which can be accessed via the `children` prop on the React side.

```html
<ReactBridge
  @reactComponent={{this.reactExample}}
	@props={{hash text=this.props.text}}
>
	<p>Hello World!</p>
</ReactBridge>
```

```tsx
function ReactExample({children, text}: ReactExampleProps) {
	return (
		<div>
			<h1>{text}</h1>
			{children} // <p>Hello World!</p>
		</div>
	)
}
```

#### How to inject a React component in Ember

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

---

### Documentation

---


<details>
<summary>How to use routing</summary>

The setup described below assumes the React component consuming the `useRouter` hook is nested within a `PolymorphicRouterContextProvider`.

This context provider is usually already defined via the `ReactBridge` custom providers. Using the hook outside of the provider will generate a console error.
### `Link` Component

Import the `Link` component from this package and use to navigate within the app, like you would do with the Ember `LinkTo`.

(`Link` is connected to the Ember router service under the hood)

```tsx
import { Link } from '@qonto/react-migration-toolkit/react/components';

function MyComponent() {
  return <Link href="/about">Visit the About page</Link>
}
```

### `useRouter` Hook

Import the `useRouter` hook from this package and use the `router` methods to navigate within the app.

```tsx
import { useRouter } from '@qonto/react-migration-toolkit/react/hooks';

function MyComponent() {
  const router = useRouter();

  return (
	  <button
	    onClick={() => {
	      router.push("/about");
        // OR
        router.replace("/about");
      }}
	  />
  )
}
```

#### `useRouter` hook API

| Property | Type | Description |
| --- | --- | --- |
| pathname | string | Get current route |
| query | object | Get query params |
| asPath | string | ??? |
| basePath | string | ??? |
| push | (url: string, as?: string,    options?: TransitionOptions) => Promise<boolean> | Redirects to another route. Equivalent of Ember `this.router.transitionTo` method. |
| replace | (url: string, as?: string,    options?: TransitionOptions) => Promise<boolean> | Redirects to another route without saving the current url in location history. Equivalent of Ember `this.router.replaceWith` method. |


</details>

<details>
<summary>How to use Ember services</summary>

This package offers a few hooks already configured to access specific Ember services, like `intl` or `router`.

It is also possible to inject any Ember service into React components thanks to custom hooks tailored to your needs.

### Steps

Simply import `useEmberService` and pass the Ember service you’d like to connect to:

```tsx
import { useEmberService } from '@qonto/react-migration-toolkit/react/hooks';

export const useStoreService = () => {
  return useEmberService('store');
};
```


The API of the Ember service remains accessible after exposing it via the `useEmberService` hook.

To ensure TypeScript correctly infers the types when injecting a service with the `useEmberService` hook, it is recommended to register the service in Ember's dependency injection registry. This allows TypeScript to infer the correct type through [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html), ensuring strong type safety across your application.

```typescript
//...service code

declare module '@ember/service' {
  interface Registry {
    segment: Segment;
  }
}
```

</details>


<details>
<summary>How to test React components in Ember</summary>


React components can be tested with *QUnit*, and existing Ember test suites are compatible with migrated components. The framework migration does not alter component behavior.

### Integration Test

Let’s imagine a newly migrated `WelcomeBanner` component:

```tsx
<div>
	<ReactBridge
    @reactComponent={{this.reactWelcomeMessage}}
    @props={{hash
      userName='Jane'
    }}
  />
	<button>Click here to continue</button>
</div>
```

```tsx
import { WelcomeMessage } from 'qonto/react/component/welcome-message'

export default class WelcomeBanner extends Component {
	reactWelcomeMessage = WelcomeMessage
};
```

```tsx
function WelcomeMessage({ userName }: WelcomeMessageProps) {
	return <h1>Welcome {userName}!</h1>;
}
```

#### Via the `ReactBridge`

Like any other Ember component, the `ReactBridge` can be rendered in `QUnit` and asserted on. This method is ideal to test React components in isolation.

```jsx
import { WelcomeMessage } from 'qonto/react/component/welcome-message'

test('It renders properly', async function (assert) {
  this.setProperties({ userName: 'Jane Doe' });
  this.reactWelcomeMessage = WelcomeMessage;

  await render(
    hbs`<ReactBridge
      @reactComponent={{this.reactWelcomeMessage}}
      @props={{hash
        cardLevel=this.userName
      }}
    />`
  );

  assert.dom('h1').hasText('Welcome Jane Doe!');
});
```

#### Via the Parent component

When migrating components from leaf to tree, bigger Ember components will often see their content replaced by a mix of Ember and React components. This should generally not impact component behavior and most tests should keep on passing without any changes.

```tsx
test('It renders properly', async function (assert) {
  await render(
    hbs`<WelcomeBanner />`
  );

  assert.dom('h1').hasText('Welcome Jane Doe!');
  assert.dom('button').hasText('Click here to continue')
});
```

### Acceptance Tests

Similarly, proper migration should generally not impact acceptance tests, since they do not test implementation details. As long as navigation flows and services are correctly setup/mocked, manual changes should not be required.

For example, if your `ReactBridge` uses `Intl` in its custom providers, make sure to mock the service via `setupIntl(*hooks*)`.

---

### Edge Cases

#### 🏎️ Rendering race

The main challenge faced when testing React components with Ember lies in the rendering process. An Ember component is blind to what happens within a nested React component and tests might start asserting on React elements that are not ready yet.

#### `act`

Luckily, React provides the [act helper](https://legacy.reactjs.org/docs/test-utils.html#act). Roughly, `act` makes asynchronous tasks synchronous and helps prevent rendering races in test scenarios. Since the `ReactBridge` already wraps its content with act (in the test environment only), both the rendering and unmounting processes are automatically handled. However, interactions or events that modify the internal state of a component (e.g., user input, API calls, or timers) are not automatically wrapped by `ReactBridge`'s act. For such scenarios, you should explicitly wrap those interactions in `act` to ensure proper state synchronization in your tests.

#### `waitFor`

In rare situations, you might still face rendering issues, asserting on missing elements.

Start by checking your React code!  Are you importing your assets correctly? Are you handling side-effects properly?

If everything seems correct, using `waitFor` can help make sure your element is available before assertion starts. Its usage should be an exception though, since the root cause most often lies in code logic.

```jsx
import { waitFor } from '@ember/test-helpers';

await waitFor('[data-test-my-element]');
assert.dom(....)
```

#### ✍️ User Events

`ember-test-helpers` are still valid to handle most user events such as `click`, `fillIn` … However you might eventually need to migrate a component relying on an Ember library providing specific test helpers.

As an example, this is the case for `Ember Power Select`, which provides [a set of helpers](https://ember-power-select.com/docs/test-helpers) targeting library-specific CSS classes. Reusing these classes and helpers would not make sense in a React context, breaking existing tests.

Since your codebase might still use components relying on the Ember package and others on the new React package, a test helpers wrapper can be created to handle both situations. It will act as a switch, identifying if the tested component is React or Ember and dispatching the adequate helper.

```jsx
import { getDropdownItems as emberGetDropdownItems } from 'ember-power-select/test-support/helpers';

function isReact(target) {
  let node = find(target);
  return Boolean(node.closest('[data-test-react-bridge-component]'));
}

async function getDropdownItems(target) {
  let dropdownItems = [];

  if (isReact(target)) {
    await click(`${target} [data-test-filter-select-trigger]`);
    document
      .querySelectorAll('[data-test-filter-select-item]')
      .forEach(item => dropdownItems.push(item.innerText));
  } else {
    dropdownItems = await emberGetDropdownItems(target); // library specific helper
  }

  return dropdownItems;
}

export * from 'ember-power-select/test-support/helpers';
export { getDropdownItems };
```

```jsx
~~import { getDropdownItems } from 'ember-power-select/test-support/helpers';~~
import { getDropdownItems } from 'qonto/tests/test-helpers/power-select-wrapper.js';

module('....', function(){ .... })
```

</details>

### Additional Providers

This package also provides a `ReactBridge` custom provider that can be used to inject the `useFlags` hook into your components to support feature flags on [LaunchDarkly](https://launchdarkly.com/).

<details>
<summary>How to use feature flags with LaunchDarkly</summary>

The setup described below assumes the React component consuming the `useFlags` hook is nested within a `LDProvider`.

This context provider is usually already defined via the `ReactBridge` custom providers. Using the hook outside of the provider will generate a console error.

### Steps

Import the `useFlags` hook from this package and retrieve the value of a feature flag you’re looking for:

```tsx
import { useFlags } from '@qonto/react-migration-toolkit/react/hooks';

function MyComponent() {
  const { featureBooleanCardUpsellBanner } = useFlags();
}
```

</details>

<details>

<summary>How to use internationalization</summary>

The setup described below assumes the React component consuming the `useIntl` hook is nested within a `RawIntlProvider` or a `IntlProvider` (see [react-intl documentation](https://formatjs.io/docs/react-intl/components/)).

In an Ember app, `RawIntlProvider` is already setup for components using the `ReactBridge` via its custom providers.

In a React app, `IntlProvider` should be setup at app level.

#### Usage

##### Given a translation key, I want to display a translated copy:

Use `FormattedMessage` from `react-intl`, like so:

```jsx
import { FormattedMessage } from "react-intl";

function MyComponent() {
  return (
    <h1>
      <FormattedMessage id="welcome.message" values={{ name: "React" }} />
    </h1>
  );
}
```

Alternatively, you can use the imperative API to achieve the same result:

```jsx
import { useIntl } from "react-intl";

function MyComponent() {
  const { formatMessage, $t } = useIntl();
  return (
    <h1>
      {formatMessage({ id: "welcome.message" }, { name: "React" })}
      {/* this works too: */}
      {$t({ id: "welcome.message" }, { name: "React" })}
    </h1>
  );
}
```

##### I want to access the current locale:

Use `useIntl` from `react-intl`

```jsx
import { useIntl } from "react-intl";

function MyComponent() {
  const { locale } = useIntl();
  return <h1>The current locale is: {locale}</h1>;
}
```

<aside>
`intl.locale` is guaranteed to be a **string** here, vs **[string, …string[]]** in `ember-intl`.
</aside>

##### I want to format a numeric value:

Use `FormattedNumber` from `react-intl`

```jsx
import { FormattedNumber } from "react-intl";

function MyComponent() {
  return <FormattedNumber value={120} />; // also accepts all formatting options as props
}
```

Alternatively, you can use the imperative API to achieve the same result:

```jsx
import { useIntl } from 'react-intl';

function MyComponent() {
	const { formatNumber } = useIntl();
	return formatNumber(120, { ... });
}
```

##### I want to display the name of a country:

```jsx
import { FormattedDisplayName } from "react-intl";

function MyComponent() {
  return (
    <h1>
      <FormattedDisplayName type="region" value="FR" />
    </h1>
  );
}
```

Alternatively, you can use the imperative API to achieve the same result:

```jsx
import { useIntl } from "react-intl";

function MyComponent() {
  const { formatDisplayName } = useIntl();
  return formatDisplayName("FR", { type: "region" });
}
```

##### I want to display the name of a currency:

```jsx
import { FormattedDisplayName } from "react-intl";

function MyComponent() {
  return (
    <h1>
      <FormattedDisplayName type="currency" value="EUR" />
    </h1>
  );
}
```

Alternatively, you can use the imperative API to achieve the same result:

```jsx
import { useIntl } from "react-intl";

function MyComponent() {
  const { formatDisplayName } = useIntl();
  return formatDisplayName("EUR", { type: "currency" });
}
```

The full API documentation is available [here](https://formatjs.io/docs/react-intl) for more use cases.

</details>

## Compatibility

- `Ember.js` v4.12 or above
- `Embroider` or `ember-auto-import` v2

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

