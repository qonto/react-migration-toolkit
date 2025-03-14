import ApplicationInstance from "@ember/application/instance";
import { type ReactNode } from "react";
import {
  useEmberService,
  useApplicationInstance,
} from "@qonto/react-migration-toolkit/react/hooks";
import { useTheme } from "./theme-context.tsx";

interface ExampleProps {
  text?: string;
  children?: ReactNode;
}

export function Example({ text, children, ...props }: ExampleProps): ReactNode {
  const owner = useApplicationInstance();
  const { user } = (useEmberService("mockUserService") as any) ?? {};
  const theme = useTheme();

  return (
    <div
      data-test-has-owner={owner instanceof ApplicationInstance}
      data-test-theme={theme?.current}
      style={{ border: "1px solid gray", padding: 16, margin: 16 }}
      {...props}
    >
      <h1>Hi there 👋</h1>
      <p>
        I am an example integrating a react component within an Ember
        application.
      </p>
      <ul>
        {user && (
          <li>
            User: <b>{user?.name}</b>
          </li>
        )}
      </ul>
      {text && (
        <div>
          <hr />
          <h3>Props values:</h3>
          <p>{text}</p>
        </div>
      )}
      {children && (
        <div data-test-children>
          <hr />
          <h3>Children values:</h3>
          <div data-test-children-content>{children}</div>
        </div>
      )}
    </div>
  );
}
