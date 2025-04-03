import React from "react";
import { YieldWrapper } from "@qonto/react-migration-toolkit/react/components";

interface YieldWrapperExampleProps {
  nodes: ChildNode[];
}

export const YieldWrapperExample: React.FC<YieldWrapperExampleProps> = ({
  nodes,
}) => {
  return <YieldWrapper nodes={nodes} />;
};
