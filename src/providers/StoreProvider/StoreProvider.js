import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';

import {store} from '../../store/store';

export const StoreProvider = ({children}) => <Provider store={store}>{children}</Provider>;

StoreProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
