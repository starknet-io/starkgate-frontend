import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {toClasses} from '../../../utils';
import styles from './Menu.module.scss';

export const Menu = ({children}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShow(true), 0);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <div className={toClasses(styles.menu, show && styles.show)}>{children}</div>;
};

Menu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
