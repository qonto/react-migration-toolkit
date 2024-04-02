import Component from '@glimmer/component';
import { ExampleRouting as ReactExampleRouting } from '../react/example-routing.tsx';
import { CustomProviders } from '../react/custom-providers.tsx';

export default class ExampleRouting extends Component {
  reactExampleRouting = ReactExampleRouting;
  customProviders = CustomProviders;
}
