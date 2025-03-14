import { registerDestructor } from '@ember/destroyable';
import { getOwner } from '@ember/application';

import { isTesting, macroCondition } from '@embroider/macros';
import Modifier from 'ember-modifier';
import {
  act,
  type ComponentType,
  createElement,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import { createRoot, type Root } from 'react-dom/client';
import type ApplicationInstance from '@ember/application/instance';
import { App } from '../react/app/app';
import type { CustomProviderOptions } from '../../types';
import {
  YieldWrapper,
  type YieldWrapperProps,
} from '../components/yield-wrapper';

function cleanup(instance: ReactModifier) {
  if (macroCondition(isTesting())) {
    window.IS_REACT_ACT_ENVIRONMENT = true;
    act(() => {
      instance.root?.unmount();
    });
  } else {
    instance.root?.unmount();
  }
}

type ReactModifierOptions = {
  reactComponent: ComponentType;
  props: PropsWithChildren;
  providerOptions: CustomProviderOptions | undefined;
  hasBlock: boolean;
};

export interface ReactModifierSignature {
  Element: HTMLElement;
  Args: {
    Positional: null;
    Named: ReactModifierOptions;
  };
}

declare global {
  interface Window {
    IS_REACT_ACT_ENVIRONMENT: boolean;
  }
}

export default class ReactModifier extends Modifier<ReactModifierSignature> {
  root: Root | null = null;
  children: ReactNode;
  isInitialRender = true;
  owner = getOwner(this) as ApplicationInstance;

  modify(
    element: Element,
    _: null,
    {
      reactComponent,
      props = {},
      providerOptions,
      hasBlock,
    }: ReactModifierOptions,
  ) {
    if (!this.root) {
      this.root = createRoot(element);
      registerDestructor(this, cleanup);
    }

    const filteredChildNodes = Array.from(element.childNodes).filter(
      ({ nodeType, textContent }) => {
        if (nodeType === Node.TEXT_NODE) {
          return String(textContent).trim() !== '';
        }
        return nodeType !== Node.COMMENT_NODE;
      },
    );
    if (this.isInitialRender && filteredChildNodes.length > 0 && hasBlock) {
      this.children = [
        createElement<YieldWrapperProps>(YieldWrapper, {
          key: crypto.randomUUID(),
          nodes: Array.from(filteredChildNodes),
        }),
      ];
      this.isInitialRender = false;
    }

    const { children, ...restOfProps } = props;
    const childrenFromProps =
      typeof children === 'function' ? createElement(children) : children;

    const wrappedComponent = createElement(
      App,
      { owner: this.owner, providerOptions },
      createElement(
        reactComponent,
        restOfProps,
        childrenFromProps || this.children,
      ),
    );

    if (macroCondition(isTesting())) {
      window.IS_REACT_ACT_ENVIRONMENT = true;
      act(() => {
        this.root?.render(wrappedComponent);
      });
    } else {
      this.root.render(wrappedComponent);
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'react-modifier': typeof ReactModifier;
  }
}
