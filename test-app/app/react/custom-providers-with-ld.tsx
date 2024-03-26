import type { PropsWithChildren, ReactNode } from "react";
import {
  type LDFlagSet,
  LDProvider,
} from "react-migration-toolkit/react/contexts/launchdarkly-context";

export function CustomProvidersWithLD({
  children,
}: PropsWithChildren<{
  ldFlags: LDFlagSet;
}>): ReactNode {
  return (
    <LDProvider ldFlags={{ "feature--experiment-a": true }}>
      {children}
    </LDProvider>
  );
}
