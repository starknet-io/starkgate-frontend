import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {ReactComponent as EtherscanLogo} from '../../../../assets/svg/etherscan.svg';
import {ReactComponent as StarknetLogo} from '../../../../assets/svg/tokens/starknet.svg';
import {LINKS} from '../../../../constants';
import {ActionType} from '../../../../enums';
import {useColors} from '../../../../hooks';
import {useWallets} from '../../../../providers/WalletsProvider';
import {openInNewTab} from '../../../../utils';
import {Button} from '../../Button/Button';
import {Circle} from '../../Circle/Circle';
import {
  BTN_TEXT,
  COMPLETE_WITHDRAWAL_TXT,
  DEPOSIT_TXT,
  STATUS_TXT,
  WITHDRAWAL_TXT
} from './TransactionSubmittedModal.strings';

const TransactionSubmittedModal = ({transfer}) => {
  const {chainId} = useWallets();
  const [networkData, setNetworkData] = useState({});

  useEffect(() => {
    const {type, starknet_hash, eth_hash} = transfer;
    const isCompletedWithdrawal = eth_hash && starknet_hash;
    if (type === ActionType.TRANSFER_TO_STARKNET || isCompletedWithdrawal) {
      setNetworkData({
        message: type === ActionType.TRANSFER_TO_STARKNET ? DEPOSIT_TXT : COMPLETE_WITHDRAWAL_TXT,
        showStatusMsg: type === ActionType.TRANSFER_TO_STARKNET,
        explorerName: LINKS.ETHERSCAN.text,
        explorerUrl: LINKS.ETHERSCAN.txUrl(chainId, eth_hash),
        explorerLogo: <EtherscanLogo style={{margin: 'auto'}} />
      });
    } else {
      setNetworkData({
        message: WITHDRAWAL_TXT,
        showStatusMsg: true,
        explorerName: LINKS.VOYAGER.text,
        explorerUrl: LINKS.VOYAGER.txUrl(chainId, starknet_hash),
        explorerLogo: <StarknetLogo style={{margin: 'auto'}} />
      });
    }
  }, []);

  const onClick = () => {
    openInNewTab(networkData.explorerUrl);
  };

  return (
    <div>
      <TransactionSubmittedModalText bold={true} text={networkData.message} />
      {networkData.showStatusMsg && <TransactionSubmittedModalText text={STATUS_TXT} />}
      <TransactionSubmittedModalButton
        networkLogo={networkData.explorerLogo}
        networkName={networkData.explorerName}
        onClick={onClick}
      />
    </div>
  );
};

const TransactionSubmittedModalText = ({text, bold}) => {
  return <p>{bold ? <b>{text}</b> : text}</p>;
};

const TransactionSubmittedModalButton = ({networkName, networkLogo, onClick}) => {
  const {colorAlpha3, colorWhite, colorWhite1} = useColors();
  return (
    <center>
      <Button
        colorBackground={colorWhite}
        colorBorder={colorAlpha3}
        colorText={colorAlpha3}
        icon={
          <Circle color={colorWhite1} size={40}>
            {networkLogo}
          </Circle>
        }
        style={{
          borderRadius: '7px',
          borderWidth: '2px',
          fontSize: '16px',
          marginTop: '25px',
          height: '50px'
        }}
        text={BTN_TEXT(networkName)}
        onClick={onClick}
      />
    </center>
  );
};

TransactionSubmittedModalText.propTypes = {
  text: PropTypes.string,
  bold: PropTypes.bool
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
