import {evaluate} from './index';

export const openInNewTab = url => {
  window.open(url, '_blank').focus();
};

export const getUrlParameter = name => {
  const results = new RegExp(`[?&]${name}=([^&#]*)`).exec(window.location.href);
  if (results === null) {
    return null;
  }
  return decodeURI(results[1]) || 0;
};

export const isOpera = () => {
  return (
    window.navigator.userAgent.indexOf('OPR') > -1 ||
    window.navigator.userAgent.indexOf('Opera') > -1
  );
};

export const isChrome = () => {
  return /(?=.*(chrome)).*/i.test(navigator.userAgent) && !isOpera();
};

export const isFirefox = () => {
  return /(?=.*(firefox)).*/i.test(navigator.userAgent);
};

export const setCookie = (name, value, days) => {
  let expires;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toGMTString()}`;
  } else {
    expires = '';
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
};

export const getCookie = name => {
  const dc = document.cookie;
  const prefix = `${name}=`;
  let begin = dc.indexOf(`; ${prefix}`);
  let end;
  if (begin === -1) {
    begin = dc.indexOf(prefix);
    if (begin !== 0) {
      return null;
    }
  } else {
    begin += 2;
    end = document.cookie.indexOf(';', begin);
    if (end === -1) {
      end = dc.length;
    }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
};

export const buildDynamicURL = (url, qsParams, dynamicQsValues = {}) => {
  const keys = Object.keys(qsParams);
  keys.length && (url += '?');
  keys.forEach(key => {
    const param = qsParams[key];
    // check if the param is not evaluated param OR the param is a key in dynamicQsValues object
    if (!/.*\{\{.+\}\}.*/.test(param) || dynamicQsValues[param.replace(/[{}]/g, '')]) {
      url += `${key}=${param}&`;
    }
  });
  if (url.slice(-1) === '?' || url.slice(-1) === '&') {
    url = url.slice(0, -1);
  }
  return evaluate(url, dynamicQsValues);
};
