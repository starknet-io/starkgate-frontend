import React from 'react';

export const combineProviders = providers =>
  /* eslint-disable-next-line react/display-name, react/prop-types */
  providers.reduce((Combined, Provider) => ({children}) => (
    <Combined>
      <Provider>{children}</Provider>
    </Combined>
  ));
