import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'test-app/tests/helpers';
import { setupIntl } from 'ember-intl/test-support';
import sinon from 'sinon';

module('Acceptance | links', function (hooks) {
  setupApplicationTest(hooks);
  setupIntl(hooks);

  test('should navigate to the about page', async function (assert) {
    await visit('/links');
    await click('[data-test-about-link]');
    assert.dom().hasText('Welcome to the About page');
  });

  module('when navigating with Polymorphic router', function (hooks) {
    hooks.beforeEach(async function () {
      await visit('/links');
    });

    test('should use push', async function (assert) {
      const router = this.owner.lookup('service:router');
      const transitionToSpy = sinon.spy(router, 'transitionTo');

      await click('[data-test-about-button-push]');

      assert.dom().hasText('Welcome to the About page');
      assert.ok(transitionToSpy.calledWith('/about', [], { queryParams: {} }));
    });

    test('should use push and keep query params', async function (assert) {
      const router = this.owner.lookup('service:router');
      const transitionToSpy = sinon.spy(router, 'transitionTo');

      await click('[data-test-about-button-push-query]');

      assert.dom().hasText('Welcome to the About page');
      assert.ok(
        transitionToSpy.calledWith('/about?foo=bar&baz=qux', [], {
          queryParams: { foo: 'bar', baz: 'qux' },
        }),
      );
    });

    test('should use replace', async function (assert) {
      const router = this.owner.lookup('service:router');
      const replaceWith = sinon.spy(router, 'replaceWith');

      await click('[data-test-about-button-replace]');

      assert.dom().hasText('Welcome to the About page');
      assert.ok(replaceWith.calledWith('/about', [], { queryParams: {} }));
    });

    test('should use replace and keep query params', async function (assert) {
      const router = this.owner.lookup('service:router');
      const replaceWith = sinon.spy(router, 'replaceWith');

      await click('[data-test-about-button-replace-query]');

      assert.dom().hasText('Welcome to the About page');
      assert.ok(
        replaceWith.calledWith('/about?foo=bar&baz=qux', [], {
          queryParams: { foo: 'bar', baz: 'qux' },
        }),
      );
    });
  });
});
