import Component from '@glimmer/component';
import reactModifier from '../modifiers/react-modifier.ts';
import './react-bridge.css';

import {
  element,
  type ElementSignature,
  type ElementFromTagName,
} from 'ember-element-helper';

interface ReactBridgeArgs<T extends string = 'div'> {
  Element: ElementFromTagName<T>;
  tagName?: ElementSignature<T>;
  Args: {
    tagName?: ElementSignature<T>['Return'];
  };
}
export default class ReactBridge extends Component<ReactBridgeArgs> {
  tagName = this.args.tagName || 'div';
  <template>
    {{! @glint-nocheck }}
    {{#let (element this.tagName) as |Tag|}}
      <Tag
        class={{unless @tagName 'react-bridge-wrapper'}}
        data-test-react-bridge-component
        {{reactModifier
          reactComponent=@reactComponent
          props=@props
          providerOptions=@providerOptions
          hasBlock=(has-block)
        }}
        ...attributes
      >
        {{~#if (has-block)~}}
          {{yield}}
        {{/if}}
      </Tag>
    {{/let}}
  </template>
}
