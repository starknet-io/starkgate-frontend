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

export const isChrome = () => {
  return /(?=.*(chrome)).*/i.test(navigator.userAgent);
};
