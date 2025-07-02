import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

export interface PolymorphicNavigate {
  (
    to: string | Path,
    options?: NavigateOptions,
  ): void | Promise<void> | Promise<boolean>;
}

export interface Path
  extends Partial<{
    hash: string;
    pathname: string;
    search: string;
  }> {
  pathname: string;
}

export type RelativeRoutingType = 'route' | 'path';

export interface NavigateOptions {
  flushSync?: boolean;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
  replace?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type comes from react-router
  state?: any;
  viewTransition?: boolean;
}

interface NavigateContextProviderProps {
  children: ReactNode;
  navigate: PolymorphicNavigate;
}

export const PolymorphicNavigateContext =
  createContext<PolymorphicNavigate | null>(null);

export function PolymorphicNavigateProvider({
  children,
  navigate,
}: NavigateContextProviderProps): ReactNode {
  return (
    <PolymorphicNavigateContext.Provider value={navigate}>
      {children}
    </PolymorphicNavigateContext.Provider>
  );
}

export function useNavigate(): PolymorphicNavigate {
  const navigate = useContext(PolymorphicNavigateContext);

  if (!navigate)
    throw new Error(
      'this hook can only be used with PolymorphicNavigateProvider',
    );

  return navigate;
}
