import type { PropsWithChildren, ReactNode } from "react";
import { ThemeProvider } from "./theme-context.tsx";
import {
  PolymorphicNavigateProvider,
  PolymorphicRouterContextProvider,
} from "@qonto/react-migration-toolkit/react/providers";
import {
  useEmberIntl,
  useEmberRouter,
  useNavigate,
} from "@qonto/react-migration-toolkit/react/hooks/providers";
import { RawIntlProvider } from "react-intl";

export function CustomProviders({ children }: PropsWithChildren): ReactNode {
  const intl = useEmberIntl();
  const router = useEmberRouter();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={{ current: "light" }} data-test-providers>
      <PolymorphicNavigateProvider navigate={navigate}>
        <PolymorphicRouterContextProvider router={router}>
          <RawIntlProvider value={intl}>{children}</RawIntlProvider>
        </PolymorphicRouterContextProvider>
      </PolymorphicNavigateProvider>
    </ThemeProvider>
  );
}
