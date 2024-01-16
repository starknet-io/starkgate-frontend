import {getCookie, setCookie} from '../src';

describe('getCookie', () => {
  beforeAll(() => {
    document.cookie = 'cookie_str=some_string';
    document.cookie = 'cookie_num=1';
    document.cookie = 'cookie_obj={"a":1}';
    document.cookie = 'cookie_bool=true';
  });
  it('should return the cookie value by name as string', () => {
    expect(getCookie('cookie_str')).toEqual('some_string');
  });
  it('should return the cookie value by name as number', () => {
    expect(getCookie('cookie_num')).toEqual(1);
  });
  it('should return the cookie value by name as object', () => {
    expect(getCookie('cookie_obj')).toEqual({a: 1});
  });
  it('should return the cookie value by name as boolean', () => {
    expect(getCookie('cookie_bool')).toBeTruthy();
  });
});

describe('setCookie', () => {
  it('should set cookie string by name', () => {
    setCookie('cookie_str', 'some_string');
    expect(document.cookie.indexOf('cookie_str="some_string"')).toBeGreaterThan(-1);
  });
  it('should set cookie merged object by name', () => {
    document.cookie = 'cookie_obj={"a":1}';
    setCookie('cookie_obj', {b: 2});
    expect(document.cookie.indexOf('cookie_obj={"a":1,"b":2}')).toBeGreaterThan(-1);
  });
});
