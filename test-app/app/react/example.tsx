import { type ReactNode } from "react";

interface ExampleProps {
  text: string;
  children?: ReactNode;
}

export function Example({ text, children }: ExampleProps): ReactNode {
  return (
    <div>
      <h1>Hi there 👋</h1>
      <p>
        I am an example integrating a react component within an Ember
        application.
      </p>
      <p>{text}</p>
      {children}
    </div>
  );
}
