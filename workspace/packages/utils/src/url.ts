import {evaluate} from './object';

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
  const evaluatedUrl = evaluate(dynamicUrl, dynamicQsValues);
  return new URL(evaluatedUrl);
};
