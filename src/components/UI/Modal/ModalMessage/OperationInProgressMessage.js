import React from 'react';

import utils from '../../../../utils';
import {toClasses} from '../../../../utils/object';
import styles from './ModalMessage.module.scss';

const DO_NOT_REFRESH_TXT_PARTS = utils.getTranslation(
  'modals.transferProgress.do_not_refresh_txt_parts'
);

export const OperationInProgressMessage = () => {
  return (
    <div className={toClasses(styles.modalMessage, styles.bottomMessage)}>
      <b>{DO_NOT_REFRESH_TXT_PARTS[0]}</b> {DO_NOT_REFRESH_TXT_PARTS[1]}
    </div>
  );
};
