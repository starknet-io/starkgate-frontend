import {sources} from '../../config/sources';

export const actions = {
  SELECT_SOURCE: 'Source/SELECT_SOURCE',
  SELECT_DEFAULT_SOURCE: 'Source/SELECT_DEFAULT_SOURCE'
};

export const initialState = {
  source: Object.keys(sources)[0]
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SELECT_SOURCE: {
      const {source} = action.payload;

      return {
        ...state,
        source
      };
    }

    case actions.SELECT_DEFAULT_SOURCE: {
      return {
        ...state,
        source: Object.keys(sources)[0]
      };
    }

    default:
      return state;
  }
};
