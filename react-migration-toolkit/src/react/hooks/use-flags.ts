import { useContext } from 'react';
import {
  camelizeObjectKeys,
  type CamelizedKeys,
} from '../utils/camelize-object-keys';
import { type FlagValue, LDContext } from '../contexts/launchdarkly-context';

export const useFlags = (): CamelizedKeys<Record<string, FlagValue>> => {
  const allFlags = useContext(LDContext);
  if (!allFlags) {
    throw new Error('useFlags must be used within a LDProvider');
  }
  return camelizeObjectKeys(allFlags);
};
