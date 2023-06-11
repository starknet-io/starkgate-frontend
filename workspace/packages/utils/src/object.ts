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

export const isObject = (item: any) => {
  return Boolean(item && typeof item === 'object' && item.constructor.name === 'Object');
};

export const mergeDeep = (target: any, ...items: Array<any>): any => {
  if (!items.length) {
    return target;
  }
  const source = items.shift();
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {[key]: {}});
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {[key]: source[key]});
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
