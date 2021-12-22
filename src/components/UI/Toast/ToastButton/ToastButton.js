import React from 'react';

import styles from './ToastButton.module.scss';

export const ToastButtons = ({children}) => {
  return <div className={styles.toastButtons}>{children}</div>;
};

export const ToastButton = ({text, color, onClick}) => {
  return (
    <div style={{color}} className={styles.toastButton} onClick={onClick}>
      {text}
    </div>
  );
};
