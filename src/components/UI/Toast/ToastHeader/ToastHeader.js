import React from 'react';

import {ReactComponent as CloseIcon} from '../../../../assets/svg/icons/close.svg';
import styles from './ToastHeader.module.scss';

export const ToastHeader = ({title, onClose, withClose}) => {
  return (
    <div className={styles.toastHeader}>
      <div className={styles.title}>{title}</div>
      {withClose && (
        <div className={styles.close} onClick={onClose}>
          <CloseIcon />
        </div>
      )}
    </div>
  );
};
