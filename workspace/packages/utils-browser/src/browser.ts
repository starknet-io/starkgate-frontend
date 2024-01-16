import {isObject, mergeDeep, promiseHandler} from '@starkware-webapps/utils';

export const openInNewTab = (url: string | URL) => {
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

export const deleteParam = (...keys: string[]) => {
  const url = new URL(window.location.href);

  keys.forEach(key => url.searchParams.delete(key));

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

export const copyToClipboard = async (text: string): Promise<boolean> => {
  const cb = navigator?.clipboard;
  const [, error] = await promiseHandler(cb?.writeText(text));
  return !error;
};

export const printPackageInfo = (name: string, version: string, color: string) => {
  // eslint-disable-next-line no-console
  console.log(`%c ${name} v${version}`, `color: ${color || '#ff98f9'};  font-size: large`);
};

function isValidQueryParam(entry: [string, string | undefined]): entry is [string, string] {
  return entry[1] !== undefined;
}

export const redirect = (url: string, queryParams: Record<string, string | undefined> = {}) => {
  const queryEntries = Object.entries(queryParams).filter(isValidQueryParam);
  const separator = url.includes('?') ? '&' : '?';
  window.location.replace(
    `${url}${
      queryEntries.length > 0 ? `${separator}${new URLSearchParams(queryEntries).toString()}` : ''
    }`
  );
};

export const loadScriptAsync = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    // Create the script tag
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    // Event listener to resolve the promise when script is loaded
    script.onload = () => {
      resolve();
    };

    // Error handling
    script.onerror = () => reject(new Error('Script failed to load'));

    // Append the script to the document head
    document.head.appendChild(script);
  });

export const loadGoogleRecaptcha = async (siteKey: string): Promise<void> => {
  return await loadScriptAsync(`https://www.google.com/recaptcha/api.js?render=${siteKey}`);
};

export const loadGoogleAnalytics = (trackingId: string): Promise<void> =>
  new Promise((resolve, reject) => {
    // Check if gtag function is already defined
    window.gtag =
      window.gtag ||
      function (...args: any[]) {
        (window.dataLayer = window.dataLayer || []).push(args);
      };

    // If script is already loaded, resolve immediately
    if (window.dataLayer) {
      resolve();
      return;
    }

    // Assuming promiseHandler and loadScriptAsync are asynchronous functions
    promiseHandler(loadScriptAsync(`https://www.googletagmanager.com/gtag/js?id=${trackingId}`))
      .then(([, error]) => {
        if (error) {
          reject(error);
        } else {
          window.gtag('js', new Date());
          window.gtag('config', trackingId);
          resolve();
        }
      })
      .catch(reject);
  });

export const scrollElementToView = (elementId: string) => {
  const elementToScroll = elementId ? document.getElementById(elementId) : null;
  elementToScroll?.scrollIntoView({behavior: 'smooth'});
};
