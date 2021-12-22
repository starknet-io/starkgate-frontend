import {Transition} from '@headlessui/react';
import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as EthereumLogo} from '../../../../assets/svg/tokens/eth.svg';
import {useColors} from '../../../../hooks';
import {TransactionData} from '../../../Features/TransactionToastManager/TransactionToastManager';
import {ToastBody} from '../ToastBody/ToastBody';
import {ToastButton, ToastButtons} from '../ToastButton/ToastButton';
import {ToastHeader} from '../ToastHeader/ToastHeader';
import {ToastSeparator} from '../ToastSeparator/ToastSeparator';
import styles from './WithdrawalTransactionToast.module.scss';
import {
  BODY_TXT,
  DISMISS_BTN_TXT,
  TITLE_TXT,
  WITHDRAWAL_BTN_TXT
} from './WithdrawalTransactionToast.strings';

export const WithdrawalTransactionToast = ({t, tx, onDismiss, onWithdrawal, onClose}) => {
  const {colorBeta, colorOmega1} = useColors();
  return (
    <Transition
      appear={true}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={t.visible}
    >
      <div className={styles.withdrawalTransactionToast}>
        <div className={styles.container}>
          <div className={styles.left}>
            <EthereumLogo style={{opacity: 0.5}} />
          </div>
          <div className={styles.right}>
            <ToastHeader title={TITLE_TXT} withClose={true} onClose={onClose} />
            <ToastBody body={BODY_TXT} style={{paddingRight: '20px'}} />
            <ToastButtons>
              <ToastButton color={colorOmega1} text={DISMISS_BTN_TXT} onClick={onDismiss} />
              <ToastButton color={colorBeta} text={WITHDRAWAL_BTN_TXT} onClick={onWithdrawal} />
            </ToastButtons>
            <ToastSeparator />
            <TransactionData style={{fontSize: '10px'}} tx={tx} />
          </div>
        </div>
      </div>
    </Transition>
  );
};

WithdrawalTransactionToast.propTypes = {
  t: PropTypes.object,
  tx: PropTypes.object,
  onDismiss: PropTypes.func,
  onWithdrawal: PropTypes.func,
  onClose: PropTypes.func
};
