import { type ReactNode } from "react";
import { useFlags } from "@qonto/react-migration-toolkit/react/hooks";

export function ExampleWithLD(): ReactNode {
  const { featureExperimentA } = useFlags();

  return (
    featureExperimentA && (
      <div data-test-feature-experiment-a>
        <hr />
        <h3>Feature Experiment A</h3>
        <p>This is a feature flag enabled</p>
      </div>
    )
  );
}
