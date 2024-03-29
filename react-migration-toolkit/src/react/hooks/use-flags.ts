import { useContext } from 'react';
import { type LDFlagSet, LDContext } from '../contexts/launchdarkly-context';

export const useFlags = (): LDFlagSet => {
  const allFlags = useContext(LDContext);
  if (!allFlags) {
    throw new Error('useFlags must be used within a LDProvider');
  }
  return camelizeFlags(allFlags);
};

const camelize = (text: string): string => {
  return text.replace(
    /-+(?<letter>[a-z])/g,
    (match: string, letter: string) => {
      return letter.toUpperCase();
    },
  );
};

const camelizeFlags = (flags: LDFlagSet): LDFlagSet => {
  return Object.entries(flags).reduce<LDFlagSet>(
    (camelizedFlags, [key, value]) => {
      const camelizedKey = camelize(key);
      camelizedFlags[camelizedKey] = value;
      return camelizedFlags;
    },
    {},
  );
};
