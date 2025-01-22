import Component from '@glimmer/component';
import reactModifier from '../modifiers/react-modifier.ts';
import { mapLegacyHTMLTranslatedContent } from '../react/components/safe-string-handler';

import './react-bridge.css';

import { element, type ElementFromTagName } from 'ember-element-helper';
import type { ComponentType } from 'react';

type ExtraProps = Partial<{
  [dataTestAttrs: `data-test-${string}`]: string;
  [ariaAttrs: `aria-${string}`]: string;
}>;

type PropsOf<T> = T extends ComponentType<infer P>
  ? Omit<P, 'children'> & ExtraProps
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

/**
 * Transforms the properties of a given component by mapping each value
 * through the `mapLegacyHTMLTranslatedContent` function. This is useful
 * for converting legacy HTML content to a format compatible with modern
 * React components.
 *
 * @template R - The type of the component's props.
 * @param {PropsOf<R> | undefined} props - The original props of the component.
 * @returns {PropsOf<R> | undefined} - A new props object with transformed values,
 *                                      or undefined if no props were provided.
 *
 * Note: The function assumes that except for the safe string conversion,
 * the types remain consistent with the original props.
 */
function transformPropsWithLegacyContent<R>(
  props: PropsOf<R> | undefined,
): PropsOf<R> | undefined {
  if (!props) return undefined;
  return {
    ...Object.fromEntries(
      Object.entries(props).map(([key, value]) => [
        key,
        mapLegacyHTMLTranslatedContent(value),
      ]),
    ),
  } as PropsOf<R>;
}

export default class ReactBridge<
  T extends keyof HTMLElementTagNameMap = 'div', // we only want to allow valid HTML tag names
  R = ComponentType,
> extends Component<ReactBridgeArgs<T, R>> {
  tagName = (this.args.tagName ?? 'div') as T;
  or = (a: unknown, b: unknown) => a ?? b;
  <template>
    {{#let (element this.tagName) as |Tag|}}
      {{#let (this.or @hasBlock (has-block)) as |normalizedHasBlock|}}
        <Tag
          class={{unless @tagName 'react-bridge-wrapper'}}
          data-test-react-bridge-component
          {{! @glint-nocheck }}
          {{reactModifier
            reactComponent=@reactComponent
            props=(transformPropsWithLegacyContent @props)
            providerOptions=@providerOptions
            hasBlock=normalizedHasBlock
          }}
          ...attributes
        >
          {{~#if normalizedHasBlock~}}
            {{yield}}
          {{/if}}
        </Tag>
      {{/let}}
    {{/let}}
  </template>
}
