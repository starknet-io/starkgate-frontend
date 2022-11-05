import PropTypes from 'prop-types';
import React from 'react';

import {useTransferTranslation} from '../../../hooks';
import styles from './MaxButton.module.scss';

export const MaxButton = ({onClick}) => {
  const {maxBtnTxt} = useTransferTranslation();

  return (
    <div className={styles.maxButton} onClick={onClick}>
      {maxBtnTxt}
    </div>
  );
};

MaxButton.propTypes = {
  onClick: PropTypes.func
};
