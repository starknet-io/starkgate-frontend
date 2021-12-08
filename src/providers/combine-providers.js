import React from 'react';

export const combineProviders = providers =>
  providers.reduce((Combined, Provider) => ({children}) => (
    <Combined>
      <Provider>{children}</Provider>
    </Combined>
  ));
