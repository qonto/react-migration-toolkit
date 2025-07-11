import { useContext } from 'react';
import {
  PolymorphicNavigateContext,
  type PolymorphicNavigate,
} from '../contexts/polymorphic-navigate-context';
import type { NavigateOptions } from 'react-router';
import {
  useInRouterContext,
  useNavigate as useReactRouterNavigate,
} from 'react-router';
import { useIsEmberRoute } from './use-is-ember-route';
import type { UrlObject } from '../types/router';

export const useNavigate = (): PolymorphicNavigate => {
  const contextNavigate = useContext(PolymorphicNavigateContext);
  if (!contextNavigate) {
    throw new Error(
      'useNavigate hook can only be used with PolymorphicNavigateProvider',
    );
  }

  // avoids Uncaught Error: useNavigate() may be used only in the context of a <Router> component
  if (!useInRouterContext()) {
    return (to: string | UrlObject, options?: NavigateOptions) => {
      return contextNavigate(to, options);
    };
  }

  const isEmberRoute = useIsEmberRoute();
  const reactRouterNavigate = useReactRouterNavigate();

  return (to: string | UrlObject, options?: NavigateOptions) => {
    if (isEmberRoute(to)) {
      return contextNavigate(to, options);
    }
    return reactRouterNavigate(to, options);
  };
};
