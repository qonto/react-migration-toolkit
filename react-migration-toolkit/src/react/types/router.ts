export interface UrlObject {
  pathname: string;
  auth?: string;
  hash?: string;
  host?: string;
  hostname?: string;
  href?: string;
  search?: string;
  slashes?: boolean;
  port?: string | number;
  query?: string | object;
}
