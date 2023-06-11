import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {ReactComponent as RefreshSvg} from '@assets/svg/icons/refresh.svg';
import {toClasses} from '@starkware-webapps/utils-browser';

import styles from './RefreshIcon.module.scss';

export const RefreshIconSize = {
  SMALL: 10,
  MEDIUM: 20,
  LARGE: 30
};

export const RefreshIcon = ({size = RefreshIconSize.MEDIUM, onClick}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animate) {
      setTimeout(() => setAnimate(false), 500);
    }
  }, [animate]);

  const onClickInternal = () => {
    setAnimate(!animate);
    onClick();
  };

  return (
    <RefreshSvg
      className={toClasses(styles.refreshIcon, animate && styles.animate)}
      style={{
        height: `${size}px`,
        width: `${size}px`
      }}
      onClick={onClickInternal}
    />
  );
};

RefreshIcon.propTypes = {
  size: PropTypes.number,
  onClick: PropTypes.func
};
