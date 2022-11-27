import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as BackIcon} from '../../../assets/svg/icons/back.svg';
import {useMenusTranslation} from '../../../hooks';
import styles from './BackButton.module.scss';

export const BackButton = ({onClick}) => {
  const {backBtnTxt} = useMenusTranslation();

  return (
    <div className={styles.backButton} onClick={onClick}>
      <BackIcon /> {backBtnTxt}
    </div>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func
};
