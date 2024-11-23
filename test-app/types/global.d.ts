import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type ReactMigrationToolkitRegistry from '@qonto/react-migration-toolkit/template-registry';
declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends ReactMigrationToolkitRegistry /* other addon registries */ {
    // local entries
  }
}
