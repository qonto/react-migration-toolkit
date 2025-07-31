import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { click, render } from '@ember/test-helpers';
import sinon from 'sinon';

import { setupIntl } from 'ember-intl/test-support';

import { setupRenderingTest } from 'test-app/tests/helpers';
import { CustomProviders } from 'test-app/react/custom-providers';

import { Link } from '@qonto/react-migration-toolkit/react/components';

module('Integration | Component | Link', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function () {
    this.router = this.owner.lookup('service:router');
    let transitionTo = {
      promise() {
        return 'result';
      },
    };

    this.router.transitionTo = sinon.spy(transitionTo, 'promise');
    this.setProperties({
      link: Link,
      reactProviderOptions: { component: CustomProviders },
    });
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <ReactBridge
        @reactComponent={{this.link}}
        @props={{hash to="/links" data-test-link=""}}
        @providerOptions={{this.reactProviderOptions}}
      />
    `);

    assert.dom('[data-test-link]').exists();
  });

  test('should trigger onClick', async function (assert) {
    this.onClick = sinon.fake();
    await render(hbs`
      <ReactBridge
        @reactComponent={{this.link}}
        @props={{hash onClick=this.onClick to="/links" data-test-link=""}}
        @providerOptions={{this.reactProviderOptions}}
      />
    `);

    await click('[data-test-link]');

    assert.true(this.onClick.calledOnce);
    assert.true(this.router.transitionTo.calledWith('/links'));
  });
});
