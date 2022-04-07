import React from 'react';

import {faqs} from '../../../config/faqs';
import {useTranslation} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {BackButton, Menu, MenuTitle} from '../../UI';
import styles from './Faq.module.scss';

export const Faq = () => {
  const {titleTxt} = useTranslation('menus.faq');
  const {showTransferMenu} = useMenu();

  return (
    <Menu>
      <div className={styles.faq}>
        <BackButton onClick={showTransferMenu} />
        <MenuTitle text={titleTxt} />
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
