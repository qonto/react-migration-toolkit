import { createContext, type ReactNode, type PropsWithChildren } from 'react';

type FlagValue = boolean | string;
export type LDFlagSet = Record<string, FlagValue>;

export const LDContext = createContext<LDFlagSet | null>(null);

interface LDProviderProps extends PropsWithChildren {
  ldFlags: LDFlagSet;
}

export function LDProvider({ children, ldFlags }: LDProviderProps): ReactNode {
  return <LDContext.Provider value={ldFlags}>{children}</LDContext.Provider>;
}
