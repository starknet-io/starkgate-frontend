import {getStorageItem, setStorageItem} from '../src';

class LocalStorageMock {
  store: {[key: string]: string};

  length = 0;

  constructor() {
    this.store = {};
  }

  key(index: number): string {
    return this.store[Object.keys(this.store)[index]];
  }

  clear() {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
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
    expect(getStorageItem('test')).toBeNull();
  });

  it('should get item hash from local storage', () => {
    setStorageItem('testObject', testObject);
    setStorageItem('testArray', testArray);
    setStorageItem('testNumber', testNumber);
    setStorageItem('testString', testString);
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
    setStorageItem('testObject', testObject);
    setStorageItem('testArray', testArray);
    setStorageItem('testNumber', testNumber);
    setStorageItem('testString', testString);
    expect(getStorageItem('testObject')).toEqual(testObject);
    expect(getStorageItem('testArray')).toEqual(testArray);
    expect(getStorageItem('testNumber')).toEqual(testNumber);
    expect(getStorageItem('testString')).toEqual(testString);
  });
});
