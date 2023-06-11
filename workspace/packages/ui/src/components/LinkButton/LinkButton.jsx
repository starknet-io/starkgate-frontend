import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as LinkIcon} from '@assets/svg/link.svg';
import {openInNewTab, toClasses} from '@starkware-webapps/utils-browser';

import styles from './LinkButton.module.scss';

export const LinkButton = ({text, url, isDisabled, onClick}) => {
  const onClickInternal = () => {
    openInNewTab(url);
    onClick();
  };

  return (
    <div
      className={toClasses(styles.linkButton, isDisabled && styles.isDisabled)}
      onClick={onClickInternal}
    >
      {text}
      <LinkIcon />
    </div>
  );
};

LinkButton.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func
};
