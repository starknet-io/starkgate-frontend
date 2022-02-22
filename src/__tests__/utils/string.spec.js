import {capitalize} from '../../utils';

describe('capitalize', () => {
  it('should capitalize string', () => {
    expect(capitalize('hello')).toEqual('Hello');
    expect(capitalize('some message')).toEqual('Some message');
  });
});
