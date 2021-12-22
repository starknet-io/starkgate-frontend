import React from 'react';

import styles from './ToastBody.module.scss';

export const ToastBody = ({body, style}) => {
  return (
    <div style={style} className={styles.toastBody}>
      {body}
    </div>
  );
};
