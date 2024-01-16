export const getPropertyPath = (obj: {[key: string]: any}, propertyPath: string): any =>
  propertyPath
    .split('.')
    .reduce((o, x) => (typeof o === 'undefined' || o === null ? o : o[x]), obj);

export const evaluate = (template: string, model: {[key: string]: any}): string => {
  try {
    let reg;
    let res = template;
    Object.keys(model).forEach(key => {
      let value = model[key] !== undefined && model[key] !== null ? model[key] : '';
      if (typeof value === 'string' && value.indexOf('"') > -1) {
        value = value.replace(/"/g, '\\"');
      }
      reg = new RegExp(`{{${key}}}`, 'g');
      res = res.replace(reg, value);
    });
    return res;
  } catch (ex) {
    return '';
  }
};

export const isObject = (item: unknown): item is object => {
  return Boolean(item && typeof item === 'object' && item.constructor.name === 'Object');
};

export const isEmptyObject = (item: any): item is Record<string, never> => {
  return isObject(item) && Object.keys(item).length === 0;
};

export type MergeDeep<T, U> = T extends object
  ? U extends object
    ? {
        [K in keyof T | keyof U]: K extends keyof T
          ? K extends keyof U
            ? MergeDeep<T[K], U[K]>
            : T[K]
          : K extends keyof U
          ? U[K]
          : never;
      }
    : U
  : U;

export const mergeDeep = <T, U extends object>(target: T, ...items: U[]): MergeDeep<T, U> => {
  if (!items.length) {
    return target as MergeDeep<T, U>;
  }
  const source = items.shift() as U[];
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key: string | number) => {
      if (isObject(source[key as number])) {
        if (!(target as Record<string, any>)[key]) Object.assign(target, {[key]: {}});
        mergeDeep((target as Record<string, any>)[key], source[key as number]);
      } else {
        Object.assign(target, {[key]: source[key as number]});
      }
    });
  }
  return mergeDeep(target, ...items);
};

export const promiseHandler = async <T>(
  promise: Promise<T>
): Promise<[T, null] | [null, Error]> => {
  try {
    return [await promise, null];
  } catch (err) {
    return [null, err as Error];
  }
};

export const valueToArray = <T>(value: undefined | T | Array<T>) => {
  return Array.isArray(value) ? value : [value];
};

export const stringifyData = (data: any, prettify = false) => {
  if (typeof data === 'object') {
    if (prettify) {
      return JSON.stringify(data, null, 2);
    }

    return JSON.stringify(data);
  }

  return data;
};

export const shuffleArray = <T>(arr: T[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const hop = (obj: any, prop: string) => Object.prototype.hasOwnProperty.call(obj, prop);
