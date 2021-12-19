import {b64d, b64e} from '../utils';

Storage.prototype.setObjectHash = function (key, myObject) {
  const newObject = {};
  Object.keys(myObject).map(function (value) {
    newObject[value] = b64e(myObject[value]);
  });
  this.setItem(key, b64e(JSON.stringify(newObject)));
};

Storage.prototype.getObjectHash = function (key) {
  const myObject = this.getItem(key);
  if (!myObject) return null;
  return (
    b64d(myObject) &&
    JSON.parse(b64d(myObject), function (key) {
      return key ? b64d(this[key]) : this[key];
    })
  );
};

export const StorageManager = {
  setItem: (key, item) => {
    if (localStorage) {
      localStorage.setObjectHash(key, JSON.stringify(item));
      return true;
    }
    return false;
  },
  getItem: key => {
    if (localStorage) {
      const item = localStorage.getObjectHash(key);
      if (item) {
        try {
          return JSON.parse(
            Object.entries(item)
              .map(c => c[1])
              .join('')
          );
        } catch (ex) {
          return item;
        }
      }
    }
  },
  removeItem: key => {
    if (localStorage) {
      localStorage.removeItem(key);
    }
  }
};
