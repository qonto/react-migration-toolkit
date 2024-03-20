import Component from '@glimmer/component';
import { Example as ReactExample } from '../react/example.tsx';

export default class Example extends Component {
  reactExample = ReactExample;
}
