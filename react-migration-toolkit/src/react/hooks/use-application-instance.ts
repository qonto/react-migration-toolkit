import type ApplicationInstance from '@ember/application/instance';
import { useContext } from 'react';
import { ApplicationContext } from '../contexts/application-context.tsx';

/**
 * Expose the owner of the application instance in charge of the Bridge component rendering this context
 */
export const useApplicationInstance = (): ApplicationInstance => {
  const applicationInstance = useContext(ApplicationContext);
  if (!applicationInstance) {
    throw new Error(
      'This hook can only be used within the ApplicationProvider',
    );
  }
  return applicationInstance;
};
