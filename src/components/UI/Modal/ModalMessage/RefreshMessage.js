import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '../../../../utils/object';
import styles from './ModalMessage.module.scss';

export const RefreshMessage = ({message}) => {
  return (
    <div className={toClasses(styles.modalMessage, styles.refreshMessage)}>
      <span dangerouslySetInnerHTML={{__html: message}} />
    </div>
  );
};

RefreshMessage.propTypes = {
  message: PropTypes.string
};
