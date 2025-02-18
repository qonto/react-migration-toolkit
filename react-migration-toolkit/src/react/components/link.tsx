import { useMemo, type ReactNode, type ComponentPropsWithoutRef } from 'react';
import { useEmberService } from '../hooks/use-ember-service.ts';
import type { UrlObject } from '../types/router.ts';
import { parseUrl } from '../utils/url.ts';
import { setUrlFromRelativePath, urlFromRouteInfo } from '../utils/router.ts';

interface LinkProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
  href: string | UrlObject;
  replace?: boolean;
}

export function Link({
  href,
  children,
  replace,
  ...props
}: LinkProps): ReactNode {
  const router = useEmberService('router');

  const url = useMemo(() => {
    const parsedUrl = parseUrl(href);
    let routeInfo;

    if (parsedUrl.startsWith('/')) {
      routeInfo = router.recognize(parsedUrl);
    } else {
      routeInfo = setUrlFromRelativePath(parsedUrl, router);
    }

    if (routeInfo) {
      return urlFromRouteInfo(router, routeInfo);
    }
    return '';
  }, [href, router]);

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (replace) {
      router.replaceWith(url);
    } else {
      router.transitionTo(url);
    }
  };

  return (
    <a href={url} onClick={onClick} {...props}>
      {children}
    </a>
  );
}
