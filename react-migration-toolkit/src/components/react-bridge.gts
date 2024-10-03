import Component from '@glimmer/component';
import reactModifier from '../modifiers/react-modifier.ts';
import './react-bridge.css';

import { element, type ElementFromTagName } from 'ember-element-helper';
import type { ComponentType } from 'react';

type PropsOf<T> = T extends ComponentType<infer P>
  ? Omit<P, 'children'>
  : never;

interface ReactBridgeArgs<T extends keyof HTMLElementTagNameMap, R> {
  Element: ElementFromTagName<T>;
  Args: {
    tagName?: T;
    reactComponent: R;
    props?: PropsOf<R>; // Mapped types don't seem to work to build args, until then props can be undefined.
  };
  Blocks: {
    default?: [];
  };
}
export default class ReactBridge<
  T extends keyof HTMLElementTagNameMap, // we only want to allow valid HTML tag names
  R extends ComponentType<PropsOf<R>>,
> extends Component<ReactBridgeArgs<T, R>> {
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
