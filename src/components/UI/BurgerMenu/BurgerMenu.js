import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {BurgerMenuItem} from '../BurgerMenuItem/BurgerMenuItem';
import styles from './BurgerMenu.module.scss';

export const BurgerMenu = ({items}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const renderItems = () => {
    return items.map((item, index) => {
      return (
        <BurgerMenuItem
          key={index}
          isActive={item.isActive}
          label={item.text}
          onClick={item.onClick}
        />
      );
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

BurgerMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};
