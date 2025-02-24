// Type to transform dash-separated keys to camelCase
type DashToCamelCase<S extends string> = S extends `${infer P1}--${infer P2}`
  ? DashToCamelCase<`${P1}-${P2}`>
  : S extends `${infer P1}-${infer P2}`
  ? `${P1}${Capitalize<DashToCamelCase<P2>>}`
  : S;

// Type to transform an object's keys from dash-separated to camelCase
export type CamelizedKeys<T> = {
  [K in keyof T as DashToCamelCase<string & K>]: T[K];
};

function toCamelCase(str: string): string {
  return str
    .replace(/--/g, '-')
    .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Transform an object's keys from dash-separated to camelCase
 * ensuring strict type checking
 */
export function camelizeObjectKeys<T extends Record<string, unknown>>(
  obj: T,
): CamelizedKeys<T> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [toCamelCase(key), value]),
  ) as CamelizedKeys<T>;
}
