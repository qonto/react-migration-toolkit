import Component from '@glimmer/component';
import { Example as ReactExample } from '../react/example';
import { htmlSafe } from '@ember/template';

const safeText = htmlSafe(
  'Click on my  <a href="https://www.google.com">link</a>',
);

export default class Example extends Component {
  reactExample = ReactExample;

  get safeText() {
    return safeText;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Example: typeof Example;
  }
}
