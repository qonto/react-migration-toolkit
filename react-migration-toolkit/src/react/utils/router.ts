import type RouteInfo from '@ember/routing/route-info';
import type { RouteModel } from '@ember/routing/router-service';
import type RouterService from '@ember/routing/router-service';

export function setUrlFromRelativePath(
  parsedUrl: string,
  router: RouterService,
): RouteInfo | undefined {
  if (!router.currentURL) {
    return;
  }
  const segments = router.currentURL.split('/').filter(Boolean);
  const currentQueryParams = router.currentURL.split('?')[1] || '';
  const targetQueryParams = parsedUrl.split('?')[1] || '';

  let index = segments[0] === 'organizations' ? 1 : 0;
  let routeInfo;
  while (index < segments.length) {
    const url = `/${segments.slice(0, index + 1).join('/')}/${parsedUrl}`;

    /*
      For some reason when using router.recognize on the current url, queryParams get lost from location history
      and using transition object when trying to navigate back or in some cases just navigating back will not show the correct queryParams
      so here we are checking if the target url is the same as the current url and avoid using router.recognize
    */
    if (`${url}?${currentQueryParams}` === router.currentURL) {
      const queryParams = targetQueryParams
        ? targetQueryParams
            .split('&')
            .reduce((acc: Record<string, string | undefined>, param) => {
              const [key, value] = param.split('=');
              if (key) acc[key] = value;
              return acc;
            }, {})
        : {};

      routeInfo = { ...router.currentRoute, queryParams };
      break;
    }

    routeInfo = router.recognize(url);
    if (routeInfo.name !== '404') break;
    index++;
  }
  return routeInfo;
}

export function urlFromRouteInfo(
  router: RouterService,
  routeInfo: RouteInfo | null,
) {
  if (!routeInfo) {
    return '/';
  }

  const args = dynamicSegmentsFromRouteInfo(routeInfo) as RouteModel[];

  if (routeInfo.queryParams && Object.keys(routeInfo.queryParams).length > 0) {
    args.push({ queryParams: routeInfo.queryParams });
  }

  try {
    return router.urlFor(routeInfo.name, ...args);
  } catch {
    return '/';
  }
}

/**
 * Returns an array of params for the route hierarchy starting with the passed-in `RouteInfo`.
 * This array is ordered top-down so it can be passed onto methods such as `RouterService#urlFor`
 *
 * @param [RouteInfo] routeInfo The leaf routeInfo to tranverse
 */
function dynamicSegmentsFromRouteInfo(
  routeInfo: RouteInfo | null,
): Array<string | object | undefined> {
  // https://github.com/NullVoxPopuli/ember-query-params-service/blob/e98e64e6cfa320f28a5f11c83b18da171c055355/addon/-private/dynamic-segments-from-route-info.ts
  if (!routeInfo) {
    return [];
  }

  const parts: Array<string | object | undefined> =
    dynamicSegmentsFromRouteInfo(routeInfo.parent);
  for (const key of routeInfo.paramNames) {
    parts.push(routeInfo.params[key]);
  }

  return parts;
}
