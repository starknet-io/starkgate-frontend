import utils from '../../utils';

const {hashEquals} = utils.hash;

describe('hashEquals', () => {
  it('should compare hashes', () => {
    expect(hashEquals([1, 2])).toBeTruthy();
    expect(hashEquals([1, 2, 3], [1, 2, 3])).toBeTruthy();
    expect(hashEquals([1, 2, 3], [1, 2, 3], [1, 2, 3])).toBeTruthy();
    expect(hashEquals([1, 2, 3], [1, 2, 3], [1])).toBeFalsy();
    expect(hashEquals([1, 2, 3], [1, 2])).toBeFalsy();
  });
});
