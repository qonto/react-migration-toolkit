import {
  createContext,
  type ReactNode,
  type PropsWithChildren,
  useState,
  useEffect,
} from 'react';
import {
  createContext,
  type ReactNode,
  type PropsWithChildren,
  useState,
  useEffect,
} from 'react';
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
  const [isDestroyed, setIsDestroyed] = useState<boolean>(false);

  useEffect(() => {
    const oldWillDestroy = owner.willDestroy;
    owner.willDestroy = (...args) => {
      setIsDestroyed(true);
      oldWillDestroy.apply(owner, args);
    };
  }, [owner]);

  if (isDestroyed) {
    return null;
  }

  return (
    <ApplicationContext.Provider value={owner}>
      {children}
    </ApplicationContext.Provider>
  );
}
