import { useCallback } from 'react';
import type { RouteModel } from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import { useEmberService } from '../../hooks';
import { parseUrl } from '../../utils/url';
import type { UrlObject } from '../../types/router';

interface PolymorphicNavigate {
  (
    to: string | Path,
    options?: NavigateOptions,
  ): void | Promise<void> | Promise<boolean>;
}

interface Path
  extends Partial<{
    hash: string;
    pathname: string;
    search: string;
  }> {
  pathname: string;
}

type RelativeRoutingType = 'route' | 'path';

interface NavigateOptions {
  flushSync?: boolean;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
  replace?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this comes from react router
  state?: any;
  viewTransition?: boolean;
}

export const useNavigate = (): PolymorphicNavigate => {
  const emberRouter = useEmberService('router');

  return useCallback(
    (
      url: string | UrlObject,
      options: NavigateOptions = {},
    ): Promise<boolean> => {
      const parsedUrl = parseUrl(url);
      const { queryParams, params } = emberRouter.recognize(parsedUrl);
      const models = Object.values(params) as RouteModel[];
      let transition: Transition<boolean>;
      if (options.replace) {
        transition = emberRouter.replaceWith(parsedUrl, models, {
          queryParams,
        }) as Transition<boolean>;
      } else {
        transition = emberRouter.transitionTo(parsedUrl, models, {
          queryParams,
        }) as Transition<boolean>;
      }
      return transition.promise;
    },
    [emberRouter],
  );
};
