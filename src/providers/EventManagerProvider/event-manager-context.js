import {createContext} from 'react';

export const EventManagerContext = createContext({
  addListener: (eventName, callback) => ({eventName, callback}),
  removeListeners: eventName => eventName,
  getPastEvents: async (contract, eventName, options) => ({contract, eventName, options})
});
