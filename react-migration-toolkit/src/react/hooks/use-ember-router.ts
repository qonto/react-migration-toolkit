import type { RouteModel } from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import { useEmberService } from './use-ember-service.ts';
import type { UrlObject } from '../types/router.ts';
import type { PolymorphicRouter } from '../contexts/polymorphic-router-context';
import { parseUrl } from '../utils/url.ts';

export const useEmberRouter = (): PolymorphicRouter => {
  const emberRouter = useEmberService('router');

  const push = (url: string | UrlObject): Promise<boolean> => {
    const parsedUrl = parseUrl(url);
    const { queryParams, params } = emberRouter.recognize(parsedUrl);
    const models = Object.values(params) as RouteModel[];
    const transition = emberRouter.transitionTo(parsedUrl, models, {
      queryParams,
    }) as Transition<boolean>;
    return transition.promise;
  };

  const replace = (url: string | UrlObject): Promise<boolean> => {
    const parsedUrl = parseUrl(url);
    const { queryParams, params } = emberRouter.recognize(parsedUrl);
    const models = Object.values(params) as RouteModel[];
    const transition = emberRouter.replaceWith(parsedUrl, models, {
      queryParams,
    }) as Transition<boolean>;
    return transition.promise;
  };

  const router: PolymorphicRouter = {
    pathname: emberRouter.currentURL,
    query: emberRouter.currentRoute?.queryParams || {},
    asPath: emberRouter.currentURL,
    basePath: emberRouter.rootURL,
    push,
    replace,
  };
  return router;
};
