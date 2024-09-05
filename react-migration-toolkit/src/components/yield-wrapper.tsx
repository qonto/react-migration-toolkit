import { useEffect, useRef } from 'react';

export interface YieldWrapperProps {
  nodes: ChildNode[];
}

export const YieldWrapper: React.FC<YieldWrapperProps> = ({ nodes }) => {
  const elRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = elRef.current;

    if (element?.parentNode) {
      const fragment = document.createDocumentFragment();
      for (const node of nodes) {
        fragment.appendChild(node);
      }

      // Replace <span> by fragment with appended nodes
      element.parentNode.replaceChild(fragment, element);
    }
  }, [nodes]);

  // This element is temporary. When mounted, it is replaced by the children nodes received from Ember.
  return <span ref={elRef}></span>;
};
