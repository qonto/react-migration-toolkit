import { StrictMode } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';
import type ApplicationInstance from '@ember/application/instance';

interface RootProps {
  owner: ApplicationInstance;
}

export function App({ children }: PropsWithChildren<RootProps>): ReactNode {
  return <StrictMode>{children}</StrictMode>;
}
