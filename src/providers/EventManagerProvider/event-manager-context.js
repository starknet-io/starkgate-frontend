import {createContext} from 'react';

export const EventManagerContext = createContext({
  addListener: (eventName, callback) => ({eventName, callback})
});
