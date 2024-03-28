import type { ComponentType, ReactNode } from 'react';

export interface CustomProviderOptions<P extends object = object> {
  component: ComponentType<{ children: ReactNode } & P>;
  props?: P;
}
