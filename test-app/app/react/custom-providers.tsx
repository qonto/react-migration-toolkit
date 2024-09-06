import type { PropsWithChildren, ReactNode } from "react";
import { ThemeProvider } from "./theme-context.tsx";
import { PolymorphicRouterContextProvider } from "@qonto/react-migration-toolkit/react/providers";
import {
  useEmberIntl,
  useEmberRouter,
} from "@qonto/react-migration-toolkit/react/hooks/providers";
import { RawIntlProvider } from "react-intl";

export function CustomProviders({ children }: PropsWithChildren): ReactNode {
  const intl = useEmberIntl();
  const router = useEmberRouter();

  return (
    <ThemeProvider theme={{ current: "light" }} data-test-providers>
      <PolymorphicRouterContextProvider router={router}>
        <RawIntlProvider value={intl}>{children}</RawIntlProvider>
      </PolymorphicRouterContextProvider>
    </ThemeProvider>
  );
}
