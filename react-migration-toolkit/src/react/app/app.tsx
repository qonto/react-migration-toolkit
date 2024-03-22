import { StrictMode } from 'react';
import type { ComponentType, PropsWithChildren, ReactNode } from 'react';
import type ApplicationInstance from '@ember/application/instance';
import { ApplicationProvider } from '../contexts/application-context.tsx';

interface AppProps {
  owner: ApplicationInstance;
  providersComponent: ComponentType<{ children: ReactNode }>;
}

export function App({
  children,
  owner,
  providersComponent,
}: PropsWithChildren<AppProps>): ReactNode {
  return (
    <StrictMode>
      <ApplicationProvider owner={owner}>
        <CustomProviders providersComponent={providersComponent}>
          {children}
        </CustomProviders>
      </ApplicationProvider>
    </StrictMode>
  );
}

function CustomProviders({
  children,
  providersComponent,
}: PropsWithChildren<{
  providersComponent: ComponentType<{ children: ReactNode }>;
}>): ReactNode {
  if (!providersComponent) return <>{children}</>;

  const Component = providersComponent;
  return <Component>{children}</Component>;
}
