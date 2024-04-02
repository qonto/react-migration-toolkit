import type { PropsWithChildren, ReactNode } from "react";
import { ThemeProvider } from "./theme-context.tsx";
import {
  PolymorphicIntlContextProvider,
  PolymorphicRouterContextProvider,
} from "react-migration-toolkit/react/providers";
import {
  useEmberIntl,
  useEmberRouter,
} from "react-migration-toolkit/react/hooks/providers";

export function CustomProviders({ children }: PropsWithChildren): ReactNode {
  const intl = useEmberIntl();
  const router = useEmberRouter();

  return (
    <ThemeProvider theme={{ current: "light" }} data-test-providers>
      <PolymorphicRouterContextProvider router={router}>
        <PolymorphicIntlContextProvider intl={intl}>
          {children}
        </PolymorphicIntlContextProvider>
      </PolymorphicRouterContextProvider>
    </ThemeProvider>
  );
}
