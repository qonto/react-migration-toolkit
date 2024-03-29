import { StrictMode } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';
import type ApplicationInstance from '@ember/application/instance';
import { ApplicationProvider } from '../contexts/application-context';
import type { CustomProviderOptions } from '../../../types';

interface AppProps {
  owner: ApplicationInstance;
  providerOptions: CustomProviderOptions | undefined;
}

export function App({
  children,
  owner,
  providerOptions,
}: PropsWithChildren<AppProps>): ReactNode {
  return (
    <StrictMode>
      <ApplicationProvider owner={owner}>
        <CustomProviders providerOptions={providerOptions}>
          {children}
        </CustomProviders>
      </ApplicationProvider>
    </StrictMode>
  );
}

function CustomProviders({
  children,
  providerOptions,
}: PropsWithChildren<{
  providerOptions: CustomProviderOptions | undefined;
}>): ReactNode {
  if (!providerOptions?.component) {
    return <>{children}</>;
  }

  const { component: Component, props = {} } = providerOptions;
  return <Component {...props}>{children}</Component>;
}
