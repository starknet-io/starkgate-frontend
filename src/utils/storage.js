export const setItem = (key, item) => {
  if (localStorage) {
    localStorage.setObjectHash(key, JSON.stringify(item));
    return true;
  }
  return false;
};

export const getItem = key => {
  if (localStorage) {
    const item = localStorage.getObjectHash(key);
    try {
      return JSON.parse(Object.values(item).join(''));
    } catch (ex) {
      return item;
    }
  }
};

Storage.prototype.setObjectHash = function (key, myObject) {
  const newObject = {};
  Object.keys(myObject).map(function (value) {
    return (newObject[value] = b64e(myObject[value]));
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

const b64e = function (str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(`0x${p1}`);
    })
  );
};

const b64d = function (str) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return `%${c.charCodeAt(0).toString(16)}`;
      })
      .join('')
  );
};
