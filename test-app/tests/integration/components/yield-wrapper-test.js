import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { YieldWrapperExample } from 'test-app/react/yield-wrapper-example';

module('Integration | Component | yield-wrapper', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setProperties({
      YieldWrapperExample,
    });
  });

  test('it correctly handles yielded content through React bridge', async function (assert) {
    // Create test nodes that would be yielded from an Ember component
    const textNode = document.createTextNode('Hello World');
    const divNode = document.createElement('div');
    divNode.textContent = 'Test Div';
    divNode.setAttribute('data-test-id', 'test-div');

    const nodes = [textNode, divNode];

    // Render using ReactBridge to simulate real usage
    this.set('nodes', nodes);
    await render(hbs`
      <ReactBridge
        @reactComponent={{this.YieldWrapperExample}}
        @props={{hash nodes=this.nodes}}
      />
    `);

    // Initially, there should be a span element
    assert.dom('span').exists('Wrapper span should exist initially');

    // Wait for the next tick to allow the useEffect to run
    await settled();

    // The span should be replaced with our nodes
    assert.dom('span').doesNotExist('Wrapper span should be removed');
    assert.dom().hasText('Hello World', 'Text node should be rendered');
    assert
      .dom('[data-test-id="test-div"]')
      .hasText('Test Div', 'Div node should be rendered');
  });

  test('it handles empty nodes array through React bridge', async function (assert) {
    this.set('nodes', []);
    await render(hbs`
      <ReactBridge
        @reactComponent={{this.YieldWrapperExample}}
        @props={{hash nodes=this.nodes}}
      />
    `);

    await settled();

    assert.dom('span').doesNotExist('Wrapper span should be removed');
    assert.dom().hasText('', 'Container should be empty');
  });

  test('it handles nested elements through React bridge', async function (assert) {
    const parentDiv = document.createElement('div');
    parentDiv.setAttribute('data-test-id', 'parent');
    const childSpan = document.createElement('span');
    childSpan.textContent = 'Nested Content';
    childSpan.setAttribute('data-test-id', 'child');
    parentDiv.appendChild(childSpan);

    const nodes = [parentDiv];

    this.set('nodes', nodes);
    await render(hbs`
      <ReactBridge
        @reactComponent={{this.YieldWrapperExample}}
        @props={{hash nodes=this.nodes}}
      />
    `);

    await settled();

    assert.dom('span').doesNotExist('Wrapper span should be removed');
    assert
      .dom('[data-test-id="parent"] [data-test-id="child"]')
      .hasText('Nested Content', 'Nested content should be rendered');
  });
});
