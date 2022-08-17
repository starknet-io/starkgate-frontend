import PropTypes from 'prop-types';
import React, {useReducer} from 'react';

import {SourceContext} from './source-context';
import {actions, initialState, reducer} from './source-reducer';

export const SourceProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectGroup = group => {
    dispatch({
      type: actions.SELECT_GROUP,
      payload: {
        group
      }
    });
  };

  const selectSource = source => {
    dispatch({
      type: actions.SELECT_SOURCE,
      payload: {
        source
      }
    });
  };

  const value = {
    ...state,
    selectGroup,
    selectSource
  };

  return <SourceContext.Provider value={value}>{children}</SourceContext.Provider>;
};

SourceProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
