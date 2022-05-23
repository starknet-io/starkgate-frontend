import React, {useState} from 'react';

import {useBurgerMenuTranslation} from '../../../hooks';
import {useApp} from '../../../providers/AppProvider';
import {toClasses} from '../../../utils';
import {BurgerMenuItem} from '../BurgerMenuItem/BurgerMenuItem';
import styles from './BurgerMenu.module.scss';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {termsTxt, faqTxt} = useBurgerMenuTranslation();
  const {navigateToRoute} = useApp();
  const items = [
    {
      text: termsTxt,
      onClick: () => navigateToRoute('/terms')
    },
    {
      text: faqTxt,
      onClick: () => navigateToRoute('/faq')
    }
  ];

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const renderItems = () => {
    return items.map((item, index) => {
      return <BurgerMenuItem key={index} label={item.text} onClick={item.onClick} />;
    });
  };

  return (
    <div className={toClasses(styles.burgerMenuContainer, isOpen && styles.isOpen)}>
      <div className={styles.burgerSymbol} onClick={toggle}>
        <div className={styles.top} />
        <div className={styles.bottom} />
      </div>
      {isOpen && <div className={styles.burgerMenu}>{renderItems()}</div>}
    </div>
  );
};

BurgerMenu.propTypes = {};
