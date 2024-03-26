import type { PropsWithChildren, ReactNode } from "react";
import { ThemeProvider } from "./theme-context.tsx";
import { PolymorphicIntlProvider } from "react-migration-toolkit/react/contexts/polymorphic-intl-context";
import { useEmberIntl } from "react-migration-toolkit/react/hooks/use-ember-intl";

export function CustomProviders({ children }: PropsWithChildren): ReactNode {
  const intl = useEmberIntl();

  return (
    <ThemeProvider theme={{ current: "light" }} data-test-providers>
      <PolymorphicIntlProvider intl={intl}>{children}</PolymorphicIntlProvider>
    </ThemeProvider>
  );
}
