import PropTypes from 'prop-types';
import React from 'react';

import {useColors, useTransferTranslation} from '../../../hooks';
import {toClasses} from '../../../utils';
import {Button} from '../index';
import styles from './TransferButton.module.scss';

export const TransferButton = props => {
  const {colorBeta, colorWhite} = useColors();
  const {transferBtnTxt} = useTransferTranslation();

  return (
    <Button
      className={toClasses(styles.transferButton)}
      colorBackground={colorBeta}
      colorBorder={colorBeta}
      colorText={colorWhite}
      height={50}
      text={transferBtnTxt}
      {...props}
    />
  );
};

TransferButton.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool
};
