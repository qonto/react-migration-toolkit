import { createContext, type ReactNode } from 'react';

export interface PolymorphicIntl {
  primaryLocale: string;
  locale: string | [string, ...string[]];
  t: (key: string, opts?: Record<string, string | number>) => string;
  setLocale: (locale: string) => void;
  formatMoney: (amount: number, opts?: object) => string; // adding it for now to ease integration,
}

interface RouterContextProviderProps {
  intl: PolymorphicIntl;
  children: ReactNode;
}

export const PolymorphicIntlContext = createContext<PolymorphicIntl | null>(
  null,
);

export function PolymorphicIntlProvider({
  children,
  intl,
}: RouterContextProviderProps): ReactNode {
  return (
    <PolymorphicIntlContext.Provider value={intl}>
      {children}
    </PolymorphicIntlContext.Provider>
  );
}
