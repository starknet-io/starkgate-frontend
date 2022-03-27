import React from 'react';

import {useMenu} from '../../../providers/MenuProvider';
import {BackButton, Menu, MenuTitle} from '../../UI';
import styles from './Faq.module.scss';
import {TITLE_TXT} from './Faq.strings';
import {FAQ_text} from './Faq.text';

export const Faq = () => {
  const {showTransferMenu} = useMenu();

  return (
    <Menu>
      <div className={styles.faq}>
        <BackButton onClick={() => showTransferMenu()} />
        <MenuTitle text={TITLE_TXT} />
        {FAQ_text}
      </div>
    </Menu>
  );
};
