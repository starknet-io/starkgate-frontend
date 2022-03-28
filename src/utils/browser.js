export const openInNewTab = (url, target) => {
  window.open(url, target || '_blank');
};

export const getUrlParameter = name => {
  name = name.replace(/[[]/, '[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const isChrome = () => {
  return /(?=.*(chrome)).*/i.test(navigator.userAgent);
};
