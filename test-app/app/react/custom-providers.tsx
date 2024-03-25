import type { PropsWithChildren, ReactNode } from "react";
import { ThemeProvider } from "./theme-context.tsx";

export function CustomProviders({ children }: PropsWithChildren): ReactNode {
  return (
    <ThemeProvider theme={{ current: "light" }} data-test-providers>
      {children}
    </ThemeProvider>
  );
}
