import {StorageManager} from '../../services';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

describe('StorageManager', () => {
  const testObject = {a: 1};
  const testNumber = 1;
  const testString = 'a';
  const testArray = [testObject];

  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
  });

  it('should return null for empty key', () => {
    expect(StorageManager.getItem('test')).toBeNull();
  });

  it('should get item hash from local storage', () => {
    StorageManager.setItem('testObject', testObject);
    StorageManager.setItem('testArray', testArray);
    StorageManager.setItem('testNumber', testNumber);
    StorageManager.setItem('testString', testString);
    expect(localStorage.getItem('testObject')).toEqual(
      'eyIwIjoiZXc9PSIsIjEiOiJJZz09IiwiMiI6IllRPT0iLCIzIjoiSWc9PSIsIjQiOiJPZz09IiwiNSI6Ik1RPT0iLCI2IjoiZlE9PSJ9'
    );
    expect(localStorage.getItem('testArray')).toEqual(
      'eyIwIjoiV3c9PSIsIjEiOiJldz09IiwiMiI6IklnPT0iLCIzIjoiWVE9PSIsIjQiOiJJZz09IiwiNSI6Ik9nPT0iLCI2IjoiTVE9PSIsIjciOiJmUT09IiwiOCI6IlhRPT0ifQ=='
    );
    expect(localStorage.getItem('testNumber')).toEqual('eyIwIjoiTVE9PSJ9');
    expect(localStorage.getItem('testString')).toEqual(
      'eyIwIjoiSWc9PSIsIjEiOiJZUT09IiwiMiI6IklnPT0ifQ=='
    );
  });

  it('should get item from storage manager', () => {
    StorageManager.setItem('testObject', testObject);
    StorageManager.setItem('testArray', testArray);
    StorageManager.setItem('testNumber', testNumber);
    StorageManager.setItem('testString', testString);
    expect(StorageManager.getItem('testObject')).toEqual(testObject);
    expect(StorageManager.getItem('testArray')).toEqual(testArray);
    expect(StorageManager.getItem('testNumber')).toEqual(testNumber);
    expect(StorageManager.getItem('testString')).toEqual(testString);
  });

  it('should backward compatible for saved arrays', () => {
    const jsonArray = JSON.stringify(testArray);
    localStorage.setItem('test', jsonArray);
    expect(localStorage.getItem('test')).toEqual(jsonArray);
    expect(StorageManager.getItem('test')).toEqual(testArray);
    expect(localStorage.getItem('test')).toEqual(
      'eyIwIjoiV3c9PSIsIjEiOiJldz09IiwiMiI6IklnPT0iLCIzIjoiWVE9PSIsIjQiOiJJZz09IiwiNSI6Ik9nPT0iLCI2IjoiTVE9PSIsIjciOiJmUT09IiwiOCI6IlhRPT0ifQ=='
    );
  });
});
