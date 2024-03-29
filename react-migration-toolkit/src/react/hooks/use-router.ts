import { useContext } from 'react';
import {
  PolymorphicRouterContext,
  type PolymorphicRouter,
} from '../contexts/polymorphic-router-context';

export const useRouter = (): PolymorphicRouter => {
  const router = useContext(PolymorphicRouterContext);
  if (!router) {
    throw new Error(
      'this hook can only be used with PolymorphicRouterProvider',
    );
  }
  return router;
};
