import Component from '@glimmer/component';
import ReactModifier from '../modifiers/react-modifier.ts';
import './react-bridge.css';

export default class ReactBridge extends Component {
  reactModifier = ReactModifier;
}
