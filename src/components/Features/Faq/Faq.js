import React from 'react';

import {faqs} from '../../../config/faqs';
import {useMenu} from '../../../providers/MenuProvider';
import {BackButton, Menu, MenuTitle} from '../../UI';
import styles from './Faq.module.scss';
import {TITLE_TXT} from './Faq.strings';

export const Faq = () => {
  const {showTransferMenu} = useMenu();

  return (
    <Menu>
      <div className={styles.faq}>
        <BackButton onClick={showTransferMenu} />
        <MenuTitle text={TITLE_TXT} />
        <div className={styles.container}>
          <ol>
            {faqs.map((faq, i) => (
              <li key={`faq-${i}`} className={styles.question}>
                <h4 dangerouslySetInnerHTML={{__html: faq.question}} />
                <div className={styles.answer} dangerouslySetInnerHTML={{__html: faq.answer}} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Menu>
  );
};
