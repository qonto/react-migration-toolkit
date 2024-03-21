import { createContext, type ReactNode, type PropsWithChildren } from 'react';
import type ApplicationInstance from '@ember/application/instance';

interface ApplicationProviderProps extends PropsWithChildren {
  owner: ApplicationInstance;
}

export const ApplicationContext = createContext<ApplicationInstance | null>(
  null,
);

export function ApplicationProvider({
  owner,
  children,
}: ApplicationProviderProps): ReactNode {
  return (
    <ApplicationContext.Provider value={owner}>
      {children}
    </ApplicationContext.Provider>
  );
}
