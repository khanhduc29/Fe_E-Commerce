import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";

export type ObjectType = {
  [key: string]: unknown;
};

// check if data is array
export const isArray = (d: any) => Array.isArray(d);

// check if data is object
export const isObject = (d: any) =>
  d === Object(d) && !isArray(d) && typeof d !== "function";

// convert object keys to camelCase
export const toCamel = function (d: any): any {
  if (isObject(d)) {
    const o: any = {};
    Object.keys(d).forEach(k => {
      o[camelCase(k)] = toCamel(d[k]);
    });

    return o;
  }
  if (isArray(d)) {
    return d.map((o: any) => toCamel(o));
  }

  return d;
};

// convert object keys to snake_case
export const toSnakeCase = function (d: any, filter = false) :any {
  if (isObject(d)) {
    const o: any = {};
    Object.keys(d).forEach(k => {
      o[snakeCase(k)] = toSnakeCase(d[k], filter);
    });

    return o;
  }
  if (isArray(d)) {
    return d.map((o: any) => toSnakeCase(o, filter));
  }
  if (filter && d === "") {
    return null;
  }
  return d;
};

export const flatObject = (
  value: Record<string, unknown>,
  currentKey?: unknown
): Record<string, unknown> => {
  let result: Record<string, unknown> = {};

  Object.keys(value).forEach(key => {
    const tempKey = currentKey ? `${currentKey}.${key}` : key;

    if (typeof value[key] !== "object") {
      result[tempKey] = value[key];
    } else {
      result = {
        ...result,
        ...flatObject(value[key] as Record<string, unknown>, tempKey),
      };
    }
  });

  return result;
};
