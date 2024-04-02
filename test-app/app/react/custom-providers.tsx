import type { PropsWithChildren, ReactNode } from "react";
import { ThemeProvider } from "./theme-context.tsx";
import { PolymorphicIntlProvider } from "react-migration-toolkit/react/contexts/polymorphic-intl-context";
import { PolymorphicRouterContextProvider } from "react-migration-toolkit/react/contexts/polymorphic-router-context";
import { useEmberIntl } from "react-migration-toolkit/react/hooks/use-ember-intl";
import { useEmberRouter } from "react-migration-toolkit/react/hooks/use-ember-router";

export function CustomProviders({ children }: PropsWithChildren): ReactNode {
  const intl = useEmberIntl();
  const router = useEmberRouter();

  return (
    <ThemeProvider theme={{ current: "light" }} data-test-providers>
      <PolymorphicRouterContextProvider router={router}>
        <PolymorphicIntlProvider intl={intl}>
          {children}
        </PolymorphicIntlProvider>
      </PolymorphicRouterContextProvider>
    </ThemeProvider>
  );
}
