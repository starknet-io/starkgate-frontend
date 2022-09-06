import PropTypes from 'prop-types';
import React from 'react';

import styles from './ToastButton.module.scss';

export const ToastButtons = ({children}) => {
  return <div className={styles.toastButtons}>{children}</div>;
};

export const ToastButton = ({text, color, icon, onClick}) => {
  return (
    <div className={styles.toastButton} style={{color}} onClick={onClick}>
      {text} {icon && icon}
    </div>
  );
};

ToastButtons.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

ToastButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.object,
  color: PropTypes.string,
  onClick: PropTypes.func
};
