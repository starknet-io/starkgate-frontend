import {findIndexById} from '../../utils';

describe('findIndexById', () => {
  it("should return the matching-object's index (Number), accourding it's 'id'.", () => {
    const array = [{id: '0cbff33f'}, {id: '11a083e3'}];
    const resultIndex = findIndexById(array, '0cbff33f');
    expect(resultIndex).toEqual(0);
  });

  it('should return -1 if no matching object', () => {
    const array = [{id: '0cbff33f'}, {id: '11a083e3'}];
    const resultIndex = findIndexById(array, '153w9f6e');
    expect(resultIndex).toEqual(-1);
  });

  it("returns -1 (Number) for falsy 'array' or falsy 'id', but allows 'id' to be 0 or '0'", () => {
    const array = [{id: '0cbff33f'}, {id: '0'}, {id: 0}];
    expect(findIndexById(undefined, '0cbff33f')).toEqual(-1);
    expect(findIndexById([], '0cbff33f')).toEqual(-1);
    expect(findIndexById(array, undefined)).toEqual(-1);
    expect(findIndexById(array, null)).toEqual(-1);
    expect(findIndexById(array, '0')).toEqual(1);
    expect(findIndexById(array, 0)).toEqual(2);
  });
});
