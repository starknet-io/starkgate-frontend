import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as RedirectIcon} from '../../../assets/svg/icons/redirect.svg';
import {openInNewTab, toClasses} from '../../../utils';
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
      <RedirectIcon />
    </div>
  );
};

LinkButton.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func
};
