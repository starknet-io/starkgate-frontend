import React from 'react';

import {toClasses} from '../../../../utils/object';
import styles from './ModalMessage.module.scss';

export const RefreshMessage = () => {
  return (
    <div className={toClasses(styles.modalMessage, styles.refreshMessage)}>
      <b>Do not refresh or close the page</b> while waiting for the operation to be completed.
    </div>
  );
};
