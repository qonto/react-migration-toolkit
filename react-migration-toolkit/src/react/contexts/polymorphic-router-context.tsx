import { createContext, type ReactNode } from 'react';

export interface PolymorphicRouter {
  pathname: string;
  query: object;
  asPath: string;
  basePath: string;
  push: (
    url: string,
    as?: string,
    options?: TransitionOptions,
  ) => Promise<boolean>;
  replace: (
    url: string,
    as?: string,
    options?: TransitionOptions,
  ) => Promise<boolean>;
}

export interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

interface RouterContextProviderProps {
  router: PolymorphicRouter;
  children: React.ReactNode;
}

export const PolymorphicRouterContext = createContext<PolymorphicRouter | null>(
  null,
);

export function PolymorphicRouterContextProvider({
  children,
  router,
}: RouterContextProviderProps): ReactNode {
  return (
    <PolymorphicRouterContext.Provider value={router}>
      {children}
    </PolymorphicRouterContext.Provider>
  );
}
