// Add any types here that you need for local development only.
// These will *not* be published as part of your addon, so be careful that your published code does not rely on them!

import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';
import type EmberElementHelperRegistry from 'ember-element-helper/template-registry';
import type EmberIntlRegistry from 'ember-intl/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberElementHelperRegistry,
      EmberIntlRegistry /* other addon registries */ {
    // local entries
  }
}
