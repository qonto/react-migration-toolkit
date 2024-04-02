import type { RegisterOptions } from '@ember/owner';
import type { Registry } from '@ember/service';
import { useApplicationInstance } from './use-application-instance';

/**
 * Expose dependency injection for Ember services in React components
 */
export function useEmberService<T extends keyof Registry>(
  serviceName: T,
  options?: RegisterOptions,
): Registry[`${T}`] {
  const owner = useApplicationInstance();
  return owner.lookup(`service:${serviceName}`, options);
}
