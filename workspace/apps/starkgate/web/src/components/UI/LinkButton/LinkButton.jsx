import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as RedirectIcon} from '@assets/svg/icons/redirect.svg';
import {openInNewTab, toClasses} from '@starkware-webapps/utils-browser';

import styles from './LinkButton.module.scss';

export const LinkButton = ({text, url, isDisabled, style, onClick}) => {
  const onClickInternal = () => {
    openInNewTab(url);
    onClick();
  };

  return (
    <div
      className={toClasses(styles.linkButton, isDisabled && styles.isDisabled)}
      style={style}
      onClick={onClickInternal}
    >
      {text}
      <RedirectIcon />
    </div>
  );
};

LinkButton.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func
};
