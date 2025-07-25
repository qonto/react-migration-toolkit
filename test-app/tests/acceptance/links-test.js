import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'test-app/tests/helpers';
import { setupIntl } from 'ember-intl/test-support';

module('Acceptance | links', function (hooks) {
  setupApplicationTest(hooks);
  setupIntl(hooks, 'en-us');

  test('should navigate to the about page', async function (assert) {
    await visit('/links');
    await click('[data-test-about-link]');
    assert.dom().hasText('Welcome to the About page');
  });

  test('should navigate to the about page with replace', async function (assert) {
    await visit('/links');
    await click('[data-test-about-link-replace]');

    assert.dom().hasText('Welcome to the About page');
  });
});
