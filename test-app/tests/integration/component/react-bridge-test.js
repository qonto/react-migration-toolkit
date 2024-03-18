import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { Example } from 'test-app/react/example.tsx';

module('Integration | Component | react-bridge', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.setProperties({
      reactExample: Example,
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
});
