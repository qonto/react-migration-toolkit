import { type ReactNode } from "react";
import { FormattedMessage } from "react-intl";

export function ExampleIntl(): ReactNode {
  return (
    <h1>
      <FormattedMessage id="welcome.message" values={{ name: "React" }} />
    </h1>
  );
}
