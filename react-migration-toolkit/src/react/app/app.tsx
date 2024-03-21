import { StrictMode } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';
import type ApplicationInstance from '@ember/application/instance';
import { ApplicationProvider } from '../contexts/application-context.tsx';

interface RootProps {
  owner: ApplicationInstance;
}

export function App({
  children,
  owner,
}: PropsWithChildren<RootProps>): ReactNode {
  return (
    <StrictMode>
      <ApplicationProvider owner={owner}>{children}</ApplicationProvider>
    </StrictMode>
  );
}
