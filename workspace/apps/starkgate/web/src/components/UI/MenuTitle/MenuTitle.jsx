import PropTypes from 'prop-types';
import React from 'react';

import styles from './MenuTitle.module.scss';

export const MenuTitle = ({text, color}) => (
  <div className={styles.menuTitle} style={{color}}>
    {text}
  </div>
);

MenuTitle.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string
};
