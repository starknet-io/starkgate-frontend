import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as EtherscanLogo} from '../../../../assets/svg/etherscan.svg';
import {ReactComponent as StarkNetLogo} from '../../../../assets/svg/tokens/starknet.svg';
import {ActionType} from '../../../../enums';
import {
  useColors,
  useConstants,
  useEnvs,
  useTransactionSubmittedModalTranslation
} from '../../../../hooks';
import utils from '../../../../utils';
import {Button} from '../../Button/Button';
import {Circle} from '../../Circle/Circle';
import {TransferToL1Message, TransferToL2Message} from '../ModalMessage';
import {ModalText} from '../ModalText/ModalText';
import styles from './TransactionSubmittedModal.module.scss';

const TransactionSubmittedModal = ({transfer}) => {
  const {ETHERSCAN, VOYAGER} = useConstants();
  const {etherscanTxUrl, voyagerTxUrl} = useEnvs();
  const {completeTransferToL1Txt, transferToL1Txt, transferToL2Txt} =
    useTransactionSubmittedModalTranslation();
  const {type, l2hash, l1hash} = transfer;
  const isTransferCompleted = l1hash && l2hash;
  const explorerButtons = [];

  const textMessage =
    type === ActionType.TRANSFER_TO_L2
      ? transferToL2Txt
      : isTransferCompleted
      ? completeTransferToL1Txt
      : transferToL1Txt;

  const messageComponent =
    type === ActionType.TRANSFER_TO_L2 ? (
      <TransferToL2Message />
    ) : !isTransferCompleted ? (
      <TransferToL1Message />
    ) : null;

  if (type === ActionType.TRANSFER_TO_L2 || isTransferCompleted) {
    explorerButtons.push({
      explorerName: ETHERSCAN,
      explorerUrl: etherscanTxUrl(l1hash),
      explorerLogo: <EtherscanLogo />
    });
  }

  if (
    (type === ActionType.TRANSFER_TO_L1 && !isTransferCompleted) ||
    type === ActionType.TRANSFER_TO_L2
  ) {
    explorerButtons.push({
      explorerName: VOYAGER,
      explorerUrl: voyagerTxUrl(l2hash),
      explorerLogo: <StarkNetLogo />
    });
  }

  const renderNetworks = () => {
    return explorerButtons.map((eb, index) => (
      <TransactionSubmittedModalButton
        key={index}
        networkLogo={eb.explorerLogo}
        networkName={eb.explorerName}
        onClick={() => utils.browser.openInNewTab(eb.explorerUrl)}
      />
    ));
  };

  return (
    <div className={styles.transactionSubmittedModal}>
      <ModalText>{textMessage}</ModalText>
      <div className={styles.buttons}>{renderNetworks()}</div>
      {messageComponent}
    </div>
  );
};

const TransactionSubmittedModalButton = ({networkName, networkLogo, onClick}) => {
  const {colorAlpha3, colorWhite, colorWhite1} = useColors();
  const {btnTxt} = useTransactionSubmittedModalTranslation();

  return (
    <Button
      colorBackground={colorWhite}
      colorBorder={colorAlpha3}
      colorText={colorAlpha3}
      icon={
        <Circle color={colorWhite1} size={40}>
          {networkLogo}
        </Circle>
      }
      text={utils.object.evaluate(btnTxt, {explorer: networkName})}
      onClick={onClick}
    />
  );
};

TransactionSubmittedModalButton.propTypes = {
  networkName: PropTypes.string,
  networkLogo: PropTypes.object,
  onClick: PropTypes.func
};

TransactionSubmittedModal.propTypes = {
  transfer: PropTypes.object
};

export default TransactionSubmittedModal;
