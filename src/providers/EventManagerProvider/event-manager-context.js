import {createContext} from 'react';

export const EventManagerContext = createContext({
  addListener: (eventName, callback) => ({eventName, callback}),
  getPastEvents: async (contract, eventName, options) => ({contract, eventName, options})
});