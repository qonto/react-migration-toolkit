import type { UrlObject } from '../types/router.ts';

type ParsedUrlQuery = Record<string, string | string[] | undefined>;

export const parseUrl = (url: string | UrlObject): string => {
  if (typeof url === 'string') {
    return url;
  }
  return formatUrlObject(url);
};

const formatUrlObject = (urlObject: UrlObject): string => {
  const { hostname } = urlObject;
  let { auth } = urlObject;

  let pathname = urlObject.pathname || '';
  let hash = urlObject.hash || '';
  let query = urlObject.query || '';
  let host: string | false = false;

  auth = auth ? `${encodeURIComponent(auth).replace(/%3A/i, ':')}@` : '';

  if (urlObject.host) {
    host = auth + urlObject.host;
  } else if (hostname) {
    host = auth + (hostname.includes(':') ? `[${hostname}]` : hostname);
    if (urlObject.port) {
      host += `:${urlObject.port}`;
    }
  }

  if (query && typeof query === 'object') {
    query = String(urlQueryToSearchParams(query as ParsedUrlQuery));
  }

  let search = urlObject.search || (query && `?${query}`) || '';

  if (urlObject.slashes && host !== false) {
    host = `//${host || ''}`;
    if (pathname && pathname.startsWith('/')) pathname = `/${pathname}`;
  } else if (!host) {
    host = '';
  }

  if (hash && !hash.startsWith('#')) hash = `#${hash}`;
  if (search && !search.startsWith('?')) search = `?${search}`;

  pathname = pathname.replace(/[?#]/g, encodeURIComponent);
  search = search.replace('#', '%23');

  return `${host}${pathname}${search}${hash}`;
};

const urlQueryToSearchParams = (urlQuery: ParsedUrlQuery): URLSearchParams => {
  const result = new URLSearchParams();
  Object.entries(urlQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        result.append(key, stringifyUrlQueryParam(item));
      });
    } else {
      result.set(key, stringifyUrlQueryParam(value));
    }
  });
  return result;
};

const stringifyUrlQueryParam = (param: unknown): string => {
  if (
    typeof param === 'string' ||
    (typeof param === 'number' && !isNaN(param)) ||
    typeof param === 'boolean'
  ) {
    return String(param);
  }
  return '';
};
