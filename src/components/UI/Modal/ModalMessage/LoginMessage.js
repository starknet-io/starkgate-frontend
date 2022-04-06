import PropTypes from 'prop-types';
import React from 'react';

import {evaluate, toClasses} from '../../../../utils/object';
import styles from './ModalMessage.module.scss';

export const LoginMessage = ({walletName, txtParts}) => {
  return (
    <div className={toClasses(styles.modalMessage, styles.bottomMessage)}>
      {evaluate(txtParts[0], {walletName})} <b>{txtParts[1]}</b>
    </div>
  );
};

LoginMessage.propTypes = {
  walletName: PropTypes.string,
  txtParts: PropTypes.array
};
