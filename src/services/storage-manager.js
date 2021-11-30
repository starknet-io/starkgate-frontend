export const StorageManager = {
  setItem: (key, item) => {
    if (localStorage) {
      localStorage.setItem(key, JSON.stringify(item));
      return true;
    }
    return false;
  },
  getItem: key => {
    if (localStorage) {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          return JSON.parse(item);
        } catch (e) {
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
