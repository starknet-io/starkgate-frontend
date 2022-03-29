import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as RedirectIcon} from '../../../assets/svg/icons/redirect.svg';
import utils from '../../../utils';
import styles from './LinkButton.module.scss';

export const LinkButton = ({text, url, isDisabled, onClick}) => {
  const onClickInternal = () => {
    utils.browser.openInNewTab(url);
    onClick();
  };

  return (
    <div
      className={utils.object.toClasses(styles.linkButton, isDisabled && styles.isDisabled)}
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
