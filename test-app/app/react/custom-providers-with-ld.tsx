import type { PropsWithChildren, ReactNode } from "react";
import {
  type LDFlagSet,
  LDProvider,
} from "react-migration-toolkit/react/contexts/launchdarkly-context";

export function CustomProvidersWithLD({
  children,
  ldFlags,
}: PropsWithChildren<{
  ldFlags: LDFlagSet;
}>): ReactNode {
  return <LDProvider ldFlags={ldFlags}>{children}</LDProvider>;
}
