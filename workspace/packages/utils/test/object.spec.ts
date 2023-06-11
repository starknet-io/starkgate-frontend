import {evaluate, findIndexById, getPropertyPath, isObject, mergeDeep, toClasses} from '../src';

describe('getPropertyPath', () => {
  const obj = {
    a: 1,
    b: 'hello',
    c: {
      d: true
    }
  };
  it('should get property by path', () => {
    expect(getPropertyPath(obj, 'a')).toEqual(1);
    expect(getPropertyPath(obj, 'b')).toEqual('hello');
    expect(getPropertyPath(obj, 'c')).toEqual({
      d: true
    });
    expect(getPropertyPath(obj, 'c.d')).toBeTruthy();
  });
});

describe('toClasses', () => {
  it('should transform array to seperated string', () => {
    expect(toClasses('c1', 'c2')).toEqual('c1 c2');
  });
});

describe('evaluate', () => {
  it('should evaluate handlebars in template', () => {
    expect(evaluate('Hello {{name}}! this is my message', {name: 'foo'})).toEqual(
      'Hello foo! this is my message'
    );
    expect(evaluate('{{host}}:{{port}}', {host: 'localhost', port: '8080'})).toEqual(
      'localhost:8080'
    );
  });
});

describe('findIndexById', () => {
  it("should return the matching-object's index (Number), according it's id", () => {
    const array = [{id: '0cbff33f'}, {id: '11a083e3'}];
    const resultIndex = findIndexById(array, '0cbff33f');
    expect(resultIndex).toEqual(0);
  });

  it('should return -1 if no matching object', () => {
    const array = [{id: '0cbff33f'}, {id: '11a083e3'}];
    const resultIndex = findIndexById(array, '153w9f6e');
    expect(resultIndex).toEqual(-1);
  });

  it("should return -1 (Number) for empty array or falsy id, but allows id to be 0 or '0'", () => {
    const array = [{id: '0cbff33f'}, {id: '0'}, {id: 0}];
    expect(findIndexById([], '0cbff33f')).toEqual(-1);
    expect(findIndexById(array, '0')).toEqual(1);
  });
});

describe('isObject', () => {
  it('should return true for a json object', () => {
    expect(isObject({})).toEqual(true);
    expect(isObject({id: '12345'})).toEqual(true);
  });

  it('should return false for a number, array, function, custom class and undefined', () => {
    expect(isObject(123)).toEqual(false);
    expect(isObject(['a', 'b', 'c'])).toEqual(false);
    expect(isObject(() => 1)).toEqual(false);
    expect(isObject(new (class {})())).toEqual(false);
    expect(isObject(undefined)).toEqual(false);
  });
});

describe('mergeDeep', () => {
  it('should merged objects correctly', () => {
    const obj1 = {a: {b: 1, c: 1}};
    const obj2 = {b: 2, a: {c: 2}, c: {a: 2}};
    const obj3 = {c: {a: 3, b: 3}};
    expect(mergeDeep(obj1, obj2, obj3)).toMatchObject({a: {b: 1, c: 2}, b: 2, c: {a: 3, b: 3}});
  });
});
