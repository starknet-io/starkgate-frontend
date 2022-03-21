import utils from '../../utils';

const {capitalize} = utils.string;

describe('capitalize', () => {
  it('should capitalize string', () => {
    expect(capitalize('hello')).toEqual('Hello');
    expect(capitalize('some message')).toEqual('Some message');
  });
});
