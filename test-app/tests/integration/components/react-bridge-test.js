import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';
import { render, rerender, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';

import { setupRenderingTest } from 'test-app/tests/helpers';
import { Example } from 'test-app/react/example';
import { ExampleIntl } from 'test-app/react/exampleIntl';
import { ExampleWithLD } from 'test-app/react/example-ld';
import { CustomProviders } from 'test-app/react/custom-providers';
import { CustomProvidersWithLD } from 'test-app/react/custom-providers-with-ld';
import { setupIntl } from 'ember-intl/test-support';
import { setupLaunchDarkly } from 'ember-launch-darkly/test-support';
import { getCurrentContext } from 'ember-launch-darkly/-sdk/context';

module('Integration | Component | react-bridge', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function () {
    this.setProperties({
      reactExample: Example,
      reactExampleIntl: ExampleIntl,
      customProvidersComponent: CustomProviders,
      reactProviderOptions: { component: CustomProviders },
    });
  });

  test('it renders with props and children', async function (assert) {
    this.setProperties({
      propsText: new (class {
        @tracked value = 'props content';
      })(),
      children: new (class {
        @tracked value = 'children content';
      })(),
    });

    await render(hbs`
      <ReactBridge
        @reactComponent={{this.reactExample}}
        @props={{hash text=this.propsText.value}}
      >
        <p>{{this.children.value}}</p>
      </ReactBridge>
    `);

    assert.dom(this.element).hasText(/Hi there 👋/i);
    assert
      .dom(this.element)
      .hasText(
        /I am an example integrating a react component within an Ember application./i,
      );
    assert.dom(this.element).hasText(/props content/i);
    assert.dom(this.element).hasText(/children content/i);

    // UPDATE CHILDREN
    this.children.value = 'new children content';

    await settled();
    assert.dom(this.element).hasText(/props content/i);
    assert.dom(this.element).hasText(/new children content/i);

    // UPDATE PROPS
    this.propsText.value = 'new props content';

    await settled();
    assert.dom(this.element).hasText(/new props content/i);
  });

  module('when no block is passed', function () {
    test('it should not pass children to the react component', async function (assert) {
      this.setProperties({
        reactExample: Example,
        props: {
          text: 'props content',
        },
      });

      await render(hbs`
        <ReactBridge
          @reactComponent={{this.reactExample}}
          @props={{this.props}}
        />
      `);

      assert.dom('[data-test-children]').doesNotExist();
    });
  });

  module('when an empty block is passed', function () {
    test('it should not pass children to the react component', async function (assert) {
      this.setProperties({
        reactExample: Example,
        props: {
          text: 'props content',
        },
      });

      await render(hbs`
        <ReactBridge
          @reactComponent={{this.reactExample}}
          @props={{this.props}}
          @hasBlock={{false}}
        > </ReactBridge>
      `);

      assert.dom('[data-test-children]').doesNotExist();
    });

    test('it should rerender without an error', async function (assert) {
      this.setProperties({
        reactExample: Example,
        props: {
          text: 'props content',
        },
      });

      await render(hbs`
        <ReactBridge
          @reactComponent={{this.reactExample}}
          @props={{this.props}}
          @hasBlock={{false}}
        > </ReactBridge>
      `);

      assert.dom('[data-test-children]').doesNotExist();

      this.setProperties({
        reactExample: Example,
        props: {
          text: 'another text',
        },
      });

      assert.dom('[data-test-children]').doesNotExist();
    });
  });

  test('it can access the Ember application instance', async function (assert) {
    await render(hbs`
      <ReactBridge @reactComponent={{this.reactExample}} />
    `);

    assert.dom("[data-test-has-owner='true']").exists();
  });

  test('it can access Ember services', async function (assert) {
    this.owner.register(
      'service:mockUserService',
      class extends Service {
        user = { name: 'John Doe' };
      },
    );

    await render(hbs`
      <ReactBridge @reactComponent={{this.reactExample}} />
    `);

    assert.dom(this.element).includesText('User: John Doe');
  });

  test('it can access Ember services via custom providers', async function (assert) {
    await render(hbs`
      <ReactBridge @reactComponent={{this.reactExample}} @providerOptions={{this.reactProviderOptions}} />
    `);

    assert.dom("[data-test-theme='light']").exists();
  });

  test('it can use an Intl provider', async function (assert) {
    await render(hbs`
      <ReactBridge @reactComponent={{this.reactExampleIntl}} @providerOptions={{this.reactProviderOptions}} />
    `);

    assert.dom(this.element).hasText('Welcome to React!');

    await this.owner.lookup('service:intl').setLocale('de-de');
    await rerender();

    assert.dom(this.element).hasText('Willkommen in React!');
  });

  module('when LDProvider is part of custom providers', function (hooks) {
    setupLaunchDarkly(hooks);

    hooks.beforeEach(async function () {
      this.customProvidersComponent = CustomProvidersWithLD;
      this.reactExample = ExampleWithLD;

      this.context = getCurrentContext();
    });

    test('it can access flags via useFlags hook', async function (assert) {
      await this.withVariation('feature--experiment-a', true);
      await render(hbs`
        <ReactBridge
          @reactComponent={{this.reactExample}}
          @providerOptions={{hash
            component=this.customProvidersComponent
            props=(hash ldFlags=this.context.allFlags)
          }}
        />
      `);

      assert.dom('[data-test-feature-experiment-a]').exists();
    });

    test('it re-renders when a flag changes', async function (assert) {
      await this.withVariation('feature--experiment-a', true);
      await render(hbs`
        <ReactBridge
          @reactComponent={{this.reactExample}}
          @providerOptions={{hash
            component=this.customProvidersComponent
            props=(hash ldFlags=this.context.allFlags)
          }}
        />
      `);

      assert.dom('[data-test-feature-experiment-a]').exists();

      await this.withVariation('feature--experiment-a', false);

      assert.dom('[data-test-feature-experiment-a]').doesNotExist();
    });
  });

  test('it defaults to a div if no tag name is passed as a prop', async function (assert) {
    await render(hbs`
      <ReactBridge @reactComponent={{this.reactExample}} />
    `);

    assert
      .dom('div[data-test-react-bridge-component]')
      .hasClass('react-bridge-wrapper');
  });

  test('it can accept a tag name as a prop', async function (assert) {
    await render(hbs`
      <ReactBridge @reactComponent={{this.reactExample}} @tagName="section" />
    `);

    assert
      .dom('section[data-test-react-bridge-component]')
      .doesNotHaveClass('react-bridge-wrapper');
  });

  test('it can render legacy HTML translated content if passed as a safeString', async function (assert) {
    let text = htmlSafe('Hello <a href="https://www.google.com">world</a>');

    this.setProperties({
      reactExample: Example,
      props: {
        text,
      },
    });

    await render(hbs`
      <ReactBridge
        @reactComponent={{this.reactExample}}
        @props={{hash text=this.props.text}}
      >
        <p>{{this.children.value}}</p>
      </ReactBridge>
    `);

    assert
      .dom('a')
      .hasAttribute('href', 'https://www.google.com')
      .hasText('world');
  });

  module('when children prop is passed directly', function () {
    test('it correctly renders strings', async function (assert) {
      let text = `Test text as children`;

      this.setProperties({
        reactExample: Example,
        props: {
          children: text,
        },
      });

      await render(hbs`
        <ReactBridge
          @reactComponent={{this.reactExample}}
          @props={{hash children=this.props.children}}
        />
    `);

      assert.dom('[data-test-children-content]').hasText(text);
    });

    test('it correctly renders ReactNode', async function (assert) {
      this.setProperties({
        reactExample: Example,
      });

      await render(hbs`
        <ReactBridge
          @reactComponent={{this.reactExample}}
          @props={{hash children=this.reactExample}}
        />
    `);

      assert.dom('h1').exists({ count: 2 });
    });
  });
});
