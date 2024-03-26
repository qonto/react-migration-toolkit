import { type ReactNode } from "react";
import { useIntl } from "react-migration-toolkit/react/hooks/use-intl";

export function ExampleIntl(): ReactNode {
  const { t } = useIntl();

  return <h1>{t("welcome.message", { name: "React" })}</h1>;
}
