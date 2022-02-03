import {findIndexById} from '../../utils';

describe('findIndexById', () => {
  it("gets array of objects, returns the matching-object's index (Number), accourding it's 'id'.", () => {
    const array = [{id: '0cbff33f'}, {id: '11a083e3'}];
    const resultIndex = findIndexById(array, '0cbff33f');
    expect(resultIndex).toEqual(0);
    // since index 0 is a legit result, we need this condition to handle the result:
    expect(!!resultIndex || (0 === 0 && resultIndex > -1)).toBeTruthy();
  });

  it('if no matching object, returns -1', () => {
    const array = [{id: '0cbff33f'}, {id: '11a083e3'}];
    expect(findIndexById(array, '153w9f6e')).toEqual(-1);
  });

  it("returns -1(Number) for falsy 'array' or falsy 'id', but allows 'id' to be 0 or '0'", () => {
    const array = [{id: '0cbff33f'}, {id: '0'}, {id: 0}];
    expect(findIndexById(undefined, '0cbff33f')).toEqual(-1);
    expect(findIndexById([], '0cbff33f')).toEqual(-1);
    expect(findIndexById(array, undefined)).toEqual(-1);
    expect(findIndexById(array, '0')).toEqual(1);
    expect(findIndexById(array, 0)).toEqual(2);
  });
});
