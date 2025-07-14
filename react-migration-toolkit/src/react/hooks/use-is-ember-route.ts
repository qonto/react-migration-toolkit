import { useLocation, useInRouterContext } from 'react-router';
import type { UrlObject } from '../types/router';
import { useEmberService } from './use-ember-service';
import { useCallback } from 'react';
/**
 * Determines whether the current route is handled by the Ember router.
 *
 * This hook inspects the application's router to check if the current path
 * matches any Ember route handler, excluding those that contain "react" in their name.
 * We need to apply a regex to explicitly  exclude 'react' routes because,
 * if not, 'react-fallback' and similar named routes would match would match.
 *
 * @returns true if the current route is an Ember route (not a React route), otherwise false.
 *
 * @remarks
 * This is useful for hybrid applications where both Ember and React routes may coexist,
 * and you need to conditionally render or handle logic based on the routing system in use.
 */
export const useIsEmberRoute = (): ((
  pathname?: string | UrlObject,
) => boolean) => {
  // avoids Uncaught Error: useLocation() may be used only in the context of a <Router> component
  if (!useInRouterContext()) {
    return () => true;
  }
  const location = useLocation();
  const emberRouter = useEmberService('router');

  return useCallback(
    (path?: string | UrlObject) => {
      // if inspection isn't possible, we assume Ember for backward compatibility
      if (!emberRouter?.recognize) return true;

      const targetPath =
        typeof path === 'string' ? path : path?.pathname || location.pathname;
      const routeName = emberRouter.recognize(targetPath).name;
      return Boolean(routeName) && !/react/.exec(routeName);
    },
    [emberRouter, location.pathname],
  );
};
