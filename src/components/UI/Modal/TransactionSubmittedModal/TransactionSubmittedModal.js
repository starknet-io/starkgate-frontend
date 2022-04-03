import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as EtherscanLogo} from '../../../../assets/svg/etherscan.svg';
import {ReactComponent as L2Logo} from '../../../../assets/svg/tokens/starknet.svg';
import constants from '../../../../config/constants';
import envs from '../../../../config/envs';
import {ActionType} from '../../../../enums';
import {useColors} from '../../../../hooks';
import utils from '../../../../utils';
import {Button} from '../../Button/Button';
import {Circle} from '../../Circle/Circle';
import {TransferToL1Message, TransferToL2Message} from '../ModalMessage';
import {ModalText} from '../ModalText/ModalText';
import styles from './TransactionSubmittedModal.module.scss';
import {
  BTN_TEXT,
  COMPLETE_TRANSFER_TO_L1_TXT,
  TRANSFER_TO_L1_TXT,
  TRANSFER_TO_L2_TXT
} from './TransactionSubmittedModal.strings';

const {ETHERSCAN, VOYAGER} = constants;
const {etherscanTxUrl, voyagerTxUrl} = envs;

const TransactionSubmittedModal = ({transfer}) => {
  const {type, l2hash, l1hash} = transfer;
  const isTransferCompleted = l1hash && l2hash;

  const textMessage =
    type === ActionType.TRANSFER_TO_L2
      ? TRANSFER_TO_L2_TXT
      : isTransferCompleted
      ? COMPLETE_TRANSFER_TO_L1_TXT
      : TRANSFER_TO_L1_TXT;

  const messageComponent =
    type === ActionType.TRANSFER_TO_L2 ? (
      <TransferToL2Message />
    ) : !isTransferCompleted ? (
      <TransferToL1Message />
    ) : null;

  const explorerButtons = [
    {
      explorerName: VOYAGER,
      explorerUrl: voyagerTxUrl(l2hash),
      explorerLogo: <L2Logo style={{margin: 'auto'}} />
    }
  ];
  if (type === ActionType.TRANSFER_TO_L2) {
    explorerButtons.push({
      explorerName: ETHERSCAN,
      explorerUrl: etherscanTxUrl(l1hash),
      explorerLogo: <EtherscanLogo style={{margin: 'auto'}} />
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
      text={BTN_TEXT(networkName)}
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
