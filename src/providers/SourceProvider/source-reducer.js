import sourceMap, {SourceGroup} from '../../config/sources';

export const actions = {
  SELECT_GROUP: 'Source/SELECT_GROUP',
  SELECT_SOURCE: 'Source/SELECT_SOURCE'
};

export const initialState = {
  group: SourceGroup.ETHEREUM,
  source: sourceMap[SourceGroup.ETHEREUM].sources[0]
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SELECT_GROUP: {
      const {group} = action.payload;

      return {
        ...state,
        group
      };
    }

    case actions.SELECT_SOURCE: {
      const {source} = action.payload;

      return {
        ...state,
        source
      };
    }

    default:
      return state;
  }
};
