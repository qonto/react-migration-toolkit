import { createContext, type ReactNode, type PropsWithChildren } from 'react';

export type FlagValue = boolean | string;
export type LDFlagSet = Record<string, FlagValue>;

import { camelizeObjectKeys } from '../utils/camelize-object-keys';

interface LDProviderProps<Flags> extends PropsWithChildren {
  ldFlags: Flags;
}

export const LDContext = createContext<LDFlagSet>({});

export function LDProvider<Flags extends Record<string, FlagValue>>({
  children,
  ldFlags,
}: LDProviderProps<Flags>): ReactNode {
  return (
    <LDContext.Provider value={camelizeObjectKeys(ldFlags)}>
      {children}
    </LDContext.Provider>
  );
}
