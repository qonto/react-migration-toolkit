import type { PropsWithChildren, ReactNode } from "react";
import { ThemeProvider } from "./theme-context.tsx";
import { useEmberIntl } from "@qonto/react-migration-toolkit/react/hooks/providers";
import { RawIntlProvider } from "react-intl";

export function CustomProviders({ children }: PropsWithChildren): ReactNode {
  const intl = useEmberIntl();

  return (
    <ThemeProvider theme={{ current: "light" }} data-test-providers>
      <RawIntlProvider value={intl}>{children}</RawIntlProvider>
    </ThemeProvider>
  );
}
