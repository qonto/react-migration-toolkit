import Component from '@glimmer/component';
import ReactModifier from '../modifiers/react-modifier.ts';

export default class ReactBridge extends Component {
  reactModifier = ReactModifier;
}
