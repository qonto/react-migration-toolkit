import { useContext } from 'react';
import {
  PolymorphicIntlContext,
  type PolymorphicIntl,
} from '../contexts/polymorphic-intl-context.tsx';

export const useIntl = (): PolymorphicIntl => {
  const intl = useContext(PolymorphicIntlContext);
  if (!intl)
    throw new Error('this hook can only be used with PolymorphicIntlProvider');
  return intl;
};
