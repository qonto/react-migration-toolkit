import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';

import { setupRenderingTest } from 'test-app/tests/helpers';
import { CustomProviders } from 'test-app/react/custom-providers';

import { NavLink } from '@qonto/react-migration-toolkit/react/components';

module('Integration | Component | NavLink', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function () {
    this.setProperties({
      navLink: NavLink,
      reactProviderOptions: { component: CustomProviders },
    });
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <ReactBridge
        @reactComponent={{this.navLink}}
        @props={{hash to="/test" data-test-nav-link=""}}
        @providerOptions={{this.reactProviderOptions}}
      />
    `);

    assert.dom('[data-test-nav-link]').exists();
    assert.dom('[data-test-nav-link]').doesNotHaveClass('active');
    assert.dom('[data-test-nav-link]').hasNoAttribute('aria-current');
  });

  module('when route is active', function (hooks) {
    hooks.beforeEach(function () {
      this.owner.register(
        'service:router',
        {
          recognize: () => {},
          currentURL: '/active',
        },
        { instantiate: false },
      );
    });

    test('should have active properties', async function (assert) {
      await render(hbs`
        <ReactBridge
          @reactComponent={{this.navLink}}
          @props={{hash to="/active" data-test-nav-link=""}}
          @providerOptions={{this.reactProviderOptions}}
        />
      `);

      assert.dom('[data-test-nav-link]').hasClass('active');
      assert.dom('[data-test-nav-link]').hasAttribute('aria-current', 'page');
    });

    test('should concatenate active class', async function (assert) {
      await render(hbs`
        <ReactBridge
          @reactComponent={{this.navLink}}
          @props={{hash className="my-class" to="/active" data-test-nav-link=""}}
          @providerOptions={{this.reactProviderOptions}}
        />
      `);

      assert
        .dom('[data-test-nav-link]')
        .hasClass('active')
        .hasClass('my-class');
    });

    test('should have custom active class', async function (assert) {
      this.className = ({ isActive }) => (isActive ? 'custom-active' : '');
      await render(hbs`
        <ReactBridge
          @reactComponent={{this.navLink}}
          @props={{hash className=this.className to="/active" data-test-nav-link=""}}
          @providerOptions={{this.reactProviderOptions}}
        />
      `);

      assert.dom('[data-test-nav-link]').hasClass('custom-active');
    });

    test('should have custom aria-current', async function (assert) {
      await render(hbs`
        <ReactBridge
          @reactComponent={{this.navLink}}
          @props={{hash aria-current="custom" to="/active" data-test-nav-link=""}}
          @providerOptions={{this.reactProviderOptions}}
        />
      `);

      assert.dom('[data-test-nav-link]').hasAttribute('aria-current', 'custom');
    });
  });
});
