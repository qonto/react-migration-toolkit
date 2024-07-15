import Component from '@glimmer/component';
import ReactModifier from '../modifiers/react-modifier.ts';
import './react-bridge.css';

import type {
  ElementSignature,
  ElementFromTagName,
} from 'ember-element-helper';

interface ReactBridgeArgs<T extends string = 'div'> {
  Element: ElementFromTagName<T>;
  tagName?: ElementSignature<T>;
  Args: {
    tagName?: ElementSignature<T>['Return'];
  };
}
export default class ReactBridge extends Component<ReactBridgeArgs> {
  reactModifier = ReactModifier;
  tagName = this.args.tagName || 'div';
}
