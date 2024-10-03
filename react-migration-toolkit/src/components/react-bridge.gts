import Component from '@glimmer/component';
import reactModifier from '../modifiers/react-modifier.ts';
import './react-bridge.css';

import { element, type ElementFromTagName } from 'ember-element-helper';

interface ReactBridgeArgs<T extends keyof HTMLElementTagNameMap> {
  Element: ElementFromTagName<T>;
  Args: {
    tagName?: T;
  };
  Blocks: {
    default?: [];
  };
}
export default class ReactBridge<
  T extends keyof HTMLElementTagNameMap, // we only want to allow valid HTML tag names
> extends Component<ReactBridgeArgs<T>> {
  tagName = (this.args.tagName ?? 'div') as T;
  <template>
    {{#let (element this.tagName) as |Tag|}}
      <Tag
        class={{unless @tagName 'react-bridge-wrapper'}}
        data-test-react-bridge-component
        {{! @glint-nocheck }}
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
