import {evaluate, getPropertyPath, toClasses} from '../../utils';

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
    expect(getPropertyPath(obj, 'c.d')).toEqual(true);
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
