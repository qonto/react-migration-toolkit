import { registerDestructor } from '@ember/destroyable';
import { getOwner } from '@ember/application';

import { isTesting, macroCondition } from '@embroider/macros';
import Modifier from 'ember-modifier';
import {
  createElement,
  Component as ReactComponent,
  type ReactElement,
  type ComponentType,
} from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import type ApplicationInstance from '@ember/application/instance';
import { App } from '../react/app/app.tsx';

function cleanup(instance: ReactModifier) {
  instance.root?.unmount();
}

interface YieldWrapperProps {
  nodes: ChildNode[];
}

class YieldWrapper extends ReactComponent<YieldWrapperProps> {
  el: HTMLElement | null = null;

  componentDidMount() {
    // Current element, ie <span>
    const element = this.el;

    // Only runs on first render (strict mode renders twice and parentNode is undefined on 2nd render)
    if (element?.parentNode) {
      const fragment = document.createDocumentFragment();
      for (const node of this.props.nodes) {
        fragment.appendChild(node);
      }

      // Replace <span> by fragment with appended nodes
      element.parentNode.replaceChild(fragment, element);
    }
  }

  render() {
    // This element is temporary. When mounted, it is replaced by the children nodes received from Ember.
    return createElement('span', {
      ref: (el) => (this.el = el),
    });
  }
}

type ReactModifierOptions = {
  reactComponent: ComponentType;
  props: object;
};

export interface ReactModifierSignature {
  Element: HTMLElement;
  Args: {
    Positional: null;
    Named: ReactModifierOptions;
  };
}

export default class ReactModifier extends Modifier<ReactModifierSignature> {
  root: Root | null = null;
  children: ReactElement[] | null = null;
  isInitialRender = true;
  owner = getOwner(this) as ApplicationInstance;

  modify(
    element: Element,
    positional: null,
    { reactComponent, props }: ReactModifierOptions,
  ) {
    if (!this.root) {
      this.root = createRoot(element);
      registerDestructor(this, cleanup);
    }

    if (this.isInitialRender && element.childNodes.length > 0) {
      const children = [
        createElement<YieldWrapperProps>(YieldWrapper, {
          key: crypto.randomUUID(),
          nodes: Array.from(element.childNodes),
        }),
      ];
      this.children = children;
      this.isInitialRender = false;
    }

    const wrappedComponent = createElement(
      App,
      { owner: this.owner },
      createElement(reactComponent, props, this.children),
    );

    if (macroCondition(isTesting())) {
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
