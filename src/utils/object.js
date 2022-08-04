export const getPropertyPath = (obj, propertyPath) =>
  propertyPath
    .split('.')
    .reduce((o, x) => (typeof o === 'undefined' || o === null ? o : o[x]), obj);

export const evaluate = (template, model) => {
  try {
    let reg,
      res = template;
    for (const key in model) {
      let value = model[key] !== undefined && model[key] !== null ? model[key] : '';
      if (typeof value === 'string' && value.indexOf('"') > -1) {
        value = value.replace(/"/g, '\\"');
      }
      reg = new RegExp(`{{${key}}}`, 'g');
      res = res.replace(reg, value);
    }
    return res;
  } catch (ex) {
    return '';
  }
};

export const findIndexById = (array, id) => {
  return array.findIndex(item => item.id === id);
};
