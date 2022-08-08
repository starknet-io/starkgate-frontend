export const actions = {
  SHOW_MODAL: 'Modal/SHOW_MODAL',
  HIDE_MODAL: 'Modal/HIDE_MODAL'
};

export const initialState = {
  show: false,
  withHeader: true,
  header: {
    withHeader: false,
    title: '',
    icon: '',
    components: []
  },
  body: {
    text: '',
    components: []
  },
  footer: {
    withButtons: false,
    components: []
  },
  containerStyle: {}
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SHOW_MODAL: {
      return {
        ...state,
        show: true,
        ...action.payload
      };
    }

    case actions.HIDE_MODAL: {
      return {
        ...initialState
      };
    }

    default:
      return state;
  }
};
