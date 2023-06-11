import {evaluate, isObject, mergeDeep, promiseHandler} from '@starkware-webapps/utils';

export const openInNewTab = (url: string) => {
  window.open(url, '_blank')?.focus();
};

export const getUrlParameter = (name: string) => {
  const results = new RegExp(`[?&]${name}=([^&#]*)`).exec(window.location.href);
  if (results === null) {
    return null;
  }
  return decodeURI(results[1]) || '';
};

export const setParam = (key: string, val: string) => {
  if (key && val) {
    const url = new URL(window.location.href);
    key = encodeURIComponent(key);
    val = encodeURIComponent(val);
    url.searchParams.set(key, val);
    window.history.pushState('', '', url.toString());
  }
};

export const deleteParam = (key: string) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.pushState('', '', url.toString());
};

export const getCookie = (name: string): object | string | number | boolean | null => {
  const dc = document.cookie;
  const prefix = `${name}=`;
  let begin = dc.indexOf(`; ${prefix}`);
  let end;
  if (begin === -1) {
    // this is the first cookie
    begin = dc.indexOf(prefix);
    if (begin !== 0) {
      return null;
    }
  } else {
    // not the first cookie - skip "; "
    begin += 2;
  }
  end = dc.indexOf(';', begin);
  if (end === -1) {
    end = dc.length;
  }
  const cookieStr = decodeURI(dc.substring(begin + prefix.length, end));
  try {
    return JSON.parse(cookieStr);
  } catch (err) {
    return cookieStr;
  }
};

export const setCookie = (name: string, value: any, days?: number) => {
  let expires;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  } else {
    expires = '';
  }
  let cookieVal = value;
  if (isObject(cookieVal)) {
    const existingCookie = getCookie(name) || {};
    cookieVal = mergeDeep(existingCookie, cookieVal);
  }
  document.cookie = `${name}=${JSON.stringify(cookieVal)}${expires}; path=/`;
};

export const buildDynamicURL = (
  url: string,
  qsParams: {[key: string]: string},
  dynamicQsValues: {[key: string]: any} = {}
) => {
  let dynamicUrl = url;
  const keys = Object.keys(qsParams);
  if (keys.length) {
    dynamicUrl += '?';
  }
  keys.forEach(key => {
    const param = qsParams[key];
    // check if the param is not evaluated param OR the param is a key in dynamicQsValues object
    if (!/.*\{\{.+}}.*/.test(param) || dynamicQsValues[param.replace(/[{}]/g, '')]) {
      dynamicUrl += `${key}=${param}&`;
    }
  });
  if (dynamicUrl.slice(-1) === '?' || dynamicUrl.slice(-1) === '&') {
    dynamicUrl = dynamicUrl.slice(0, -1);
  }
  return evaluate(dynamicUrl, dynamicQsValues);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  const cb = navigator?.clipboard;
  const [, error] = await promiseHandler(cb?.writeText(text));
  return !error;
};

export const printPackageInfo = (name: string, version: string, color: string) => {
  // eslint-disable-next-line no-console
  console.log(`%c ${name} v${version}`, `color: ${color || '#ff98f9'};  font-size: large`);
};

export const redirect = (url: string, queryParams: {[key: string]: string} = {}) => {
  const queryString =
    Object.keys(queryParams).length > 0 ? `?${new URLSearchParams(queryParams).toString()}` : '';
  window.location.replace(url + queryString);
};
