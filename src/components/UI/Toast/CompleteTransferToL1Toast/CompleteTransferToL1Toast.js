import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as EthereumIcon} from '../../../../assets/svg/chains/ethereum.svg';
import {ReactComponent as ArrowRight} from '../../../../assets/svg/icons/arrow-right.svg';
import {useColors, useCompleteTransferToastTranslation} from '../../../../hooks';
import {TransferData} from '../../../Features';
import {CallToActionToast} from '../CallToActionToast/CallToActionToast';
import {TransferLogLink} from '../ToastFooter/ToastFooter';

export const CompleteTransferToL1Toast = ({
  t,
  transfer,
  onDismiss,
  onCompleteTransfer,
  onTransferLogLinkClick
}) => {
  const {titleTxt, bodyTxt, dismissBtnTxt, completeTransferBtnTxt} =
    useCompleteTransferToastTranslation();
  const {colorGraniteGray} = useColors();

  return (
    <CallToActionToast
      actionTxt={completeTransferBtnTxt}
      actionIcon={<ArrowRight />}
      backgroundColor={colorGraniteGray}
      bodyTxt={bodyTxt}
      bodyStyle={{paddingBottom: '0'}}
      style={{maxWidth: '448px'}}
      dismissTxt={dismissBtnTxt}
      footer={
        <>
          <TransferData transfer={transfer} />
          <TransferLogLink onClick={onTransferLogLinkClick} />
        </>
      }
      sideIcon={<EthereumIcon style={{opacity: 0.5}} width={80} />}
      t={t}
      titleTxt={titleTxt}
      onAction={onCompleteTransfer}
      onDismiss={onDismiss}
    />
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
