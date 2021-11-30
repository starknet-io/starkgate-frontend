import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../../hooks';
import {toClasses} from '../../../../utils';
import {Loading} from '../../../UI';
import {LoadingSize} from '../../../UI/Loading/Loading.enums';
import styles from './WalletConnectionModal.module.scss';
import {BODY_TXT} from './WalletConnectionModal.strings';

const WalletConnectionModal = ({walletName}) => {
  const {colorBeta} = useColors();

  return (
    <div className={styles.walletConnectionModal}>
      <div>{BODY_TXT(walletName)}</div>
      <div className={toClasses(styles.loading, 'center')}>
        <Loading color={colorBeta} size={LoadingSize.LARGE} />
      </div>
    </div>
  );
};

WalletConnectionModal.propTypes = {
  walletName: PropTypes.string
};

export default WalletConnectionModal;
