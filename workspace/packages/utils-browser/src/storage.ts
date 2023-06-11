export const setStorageItem = (key: string, item: any): boolean => {
  if (localStorage) {
    localStorage.setObjectHash(key, JSON.stringify(item));
    return true;
  }
  return false;
};

export const getStorageItem = (key: string): any => {
  if (localStorage) {
    const item = localStorage.getObjectHash(key);
    try {
      return JSON.parse(Object.values(item).join(''));
    } catch (ex) {
      return item;
    }
  }
  return null;
};

function b64e(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(Number(`0x${p1}`));
    })
  );
}

function b64d(str: string): string {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return `%${c.charCodeAt(0).toString(16)}`;
      })
      .join('')
  );
}

if (typeof Storage !== 'undefined') {
  Storage.prototype.setObjectHash = function (key: string, item: {[key: string]: any}) {
    const newItem: {[key: string]: any} = {};
    Object.keys(item).map(function (value) {
      newItem[value] = b64e(item[value]);
      return newItem[value];
    });
    this.setItem(key, b64e(JSON.stringify(newItem)));
  };

  Storage.prototype.getObjectHash = function (key: string): {[key: string]: any} | null {
    const item = this.getItem(key);
    if (!item) return null;
    return (
      b64d(item) &&
      JSON.parse(b64d(item), function (k: string) {
        return k ? b64d(this[k]) : this[k];
      })
    );
  };
}
