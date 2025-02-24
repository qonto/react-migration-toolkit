import { useContext } from 'react';
import {
  PolymorphicNavigateContext,
  type PolymorphicNavigate,
} from '../contexts/polymorphic-navigate-context';

export const useNavigate = (): PolymorphicNavigate => {
  const navigate = useContext(PolymorphicNavigateContext);
  if (!navigate) {
    throw new Error(
      'this hook can only be used with PolymorphicNavigateProvider',
    );
  }
  return navigate;
};
