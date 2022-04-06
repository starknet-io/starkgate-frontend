import React from 'react';

import utils from '../../../../utils';
import {toClasses} from '../../../../utils/object';
import styles from './ModalMessage.module.scss';

const [LOGIN_TXT, RELOAD_TXT] = utils.getTranslation('modals.login.body_txt_parts');

export const LoginMessage = () => {
  return (
    <div className={toClasses(styles.modalMessage, styles.bottomMessage)}>
      {LOGIN_TXT} <b>{RELOAD_TXT}</b>
    </div>
  );
};
