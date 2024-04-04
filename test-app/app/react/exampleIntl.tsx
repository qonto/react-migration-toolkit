import { type ReactNode } from "react";
import { useIntl } from "@qonto/react-migration-toolkit/react/hooks";

export function ExampleIntl(): ReactNode {
  const { t } = useIntl();

  return <h1>{t("welcome.message", { name: "React" })}</h1>;
}
