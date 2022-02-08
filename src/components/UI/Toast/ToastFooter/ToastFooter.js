import PropTypes from 'prop-types';
import React from 'react';

import styles from './ToastFooter.module.scss';
import {TRANSFER_LOG_LINK_BTN_TXT} from './ToastFooter.strings';

export const ToastFooter = ({children}) => {
  return <div className={styles.toastFooter}>{children}</div>;
};

export const TransferLogLink = ({onClick}) => {
  return (
    <div className={styles.transferLogLink} onClick={onClick}>
      {TRANSFER_LOG_LINK_BTN_TXT}
    </div>
  );
};

ToastFooter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

TransferLogLink.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};
