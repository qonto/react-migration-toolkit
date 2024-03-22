import ApplicationInstance from "@ember/application/instance";
import { type ReactNode } from "react";
import { useApplicationInstance } from "react-migration-toolkit/react/hooks/use-application-instance";
import { useEmberService } from "react-migration-toolkit/react/hooks/use-ember-service";

interface ExampleProps {
  text?: string;
  children?: ReactNode;
}

export function Example({ text, children }: ExampleProps): ReactNode {
  const owner = useApplicationInstance();
  const { user } = (useEmberService("mockUserService") as any) ?? {};

  return (
    <div data-test-has-owner={owner instanceof ApplicationInstance}>
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
          {children}
        </div>
      )}
    </div>
  );
}
