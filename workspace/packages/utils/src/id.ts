import {v4 as uuidv4} from 'uuid';

export const generateId = (): string => {
  return uuidv4();
};

export const findIndexById = (array: Array<any>, id: string): any => {
  return id ? array.findIndex(item => item.id === id) : -1;
};
