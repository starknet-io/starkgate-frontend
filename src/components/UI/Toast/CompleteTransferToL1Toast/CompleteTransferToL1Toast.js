import {Transition} from '@headlessui/react';
import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as L1Logo} from '../../../../assets/svg/tokens/eth.svg';
import {useColors} from '../../../../hooks';
import {TransferData} from '../../../Features';
import {ToastBody} from '../ToastBody/ToastBody';
import {ToastButton, ToastButtons} from '../ToastButton/ToastButton';
import {ToastFooter, TransferLogLink} from '../ToastFooter/ToastFooter';
import {ToastHeader} from '../ToastHeader/ToastHeader';
import {ToastSeparator} from '../ToastSeparator/ToastSeparator';
import styles from './CompleteTransferToL1Toast.module.scss';
import {
  BODY_TXT,
  DISMISS_BTN_TXT,
  TITLE_TXT,
  COMPLETE_TRANSFER_BTN_TXT
} from './CompleteTransferToL1Toast.strings';

export const CompleteTransferToL1Toast = ({
  t,
  transfer,
  onDismiss,
  onCompleteTransfer,
  onTransferLogLinkClick,
  onClose
}) => {
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
      <div className={styles.completeTransferToL1Toast}>
        <div className={styles.container}>
          <div className={styles.left}>
            <L1Logo style={{opacity: 0.5}} />
          </div>
          <div className={styles.right}>
            <ToastHeader title={TITLE_TXT} withClose={true} onClose={onClose} />
            <ToastBody body={BODY_TXT} style={{paddingRight: '20px'}} />
            <ToastButtons>
              <ToastButton color={colorOmega1} text={DISMISS_BTN_TXT} onClick={onDismiss} />
              <ToastButton
                color={colorBeta}
                text={COMPLETE_TRANSFER_BTN_TXT}
                onClick={onCompleteTransfer}
              />
            </ToastButtons>
            <ToastSeparator />
            <TransferData style={{fontSize: '10px'}} transfer={transfer} />
            <ToastFooter>
              <TransferLogLink onClick={onTransferLogLinkClick} />
            </ToastFooter>
          </div>
        </div>
      </div>
    </Transition>
  );
};

CompleteTransferToL1Toast.propTypes = {
  t: PropTypes.object,
  transfer: PropTypes.object,
  onDismiss: PropTypes.func,
  onCompleteTransfer: PropTypes.func,
  onClose: PropTypes.func,
  onTransferLogLinkClick: PropTypes.func
};
