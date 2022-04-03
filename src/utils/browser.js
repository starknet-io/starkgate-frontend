export const openInNewTab = url => {
  window.open(url);
};

export const getUrlParameter = name => {
  name = name.replace(/[[]/, '[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[&]${name}=([^&#]*)`);
  const results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const isChrome = () => {
  return /(?=.*(chrome)).*/i.test(navigator.userAgent);
};
