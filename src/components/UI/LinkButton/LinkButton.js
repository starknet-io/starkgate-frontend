import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as RedirectIcon} from '../../../assets/svg/icons/redirect.svg';
import {openInNewTab} from '../../../utils';
import styles from './LinkButton.module.scss';

export const LinkButton = ({text, url}) => {
  const onClick = () => {
    openInNewTab(url);
  };

  return (
    <div className={styles.linkButton} onClick={onClick}>
      {text}
      <RedirectIcon />
    </div>
  );
};

LinkButton.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string
};
