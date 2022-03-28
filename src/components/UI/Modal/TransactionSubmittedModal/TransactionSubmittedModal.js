import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {ReactComponent as EtherscanLogo} from '../../../../assets/svg/etherscan.svg';
import {ReactComponent as L2Logo} from '../../../../assets/svg/tokens/starknet.svg';
import constants from '../../../../config/constants';
import envs from '../../../../config/envs';
import {ActionType} from '../../../../enums';
import {useColors} from '../../../../hooks';
import utils from '../../../../utils';
import {Button} from '../../Button/Button';
import {Circle} from '../../Circle/Circle';
import {
  BTN_TEXT,
  COMPLETE_TRANSFER_TO_L1_TXT,
  STATUS_TXT,
  TRANSFER_TO_L1_TXT,
  TRANSFER_TO_L2_TXT
} from './TransactionSubmittedModal.strings';

const {ETHERSCAN, VOYAGER} = constants;
const {etherscanTxUrl, voyagerTxUrl} = envs;

const TransactionSubmittedModal = ({transfer}) => {
  const [networkData, setNetworkData] = useState({});

  useEffect(() => {
    const {type, l2hash, l1hash} = transfer;
    const isTransferCompleted = l1hash && l2hash;
    if (type === ActionType.TRANSFER_TO_L2 || isTransferCompleted) {
      setNetworkData({
        message:
          type === ActionType.TRANSFER_TO_L2 ? TRANSFER_TO_L2_TXT : COMPLETE_TRANSFER_TO_L1_TXT,
        showStatusMsg: type === ActionType.TRANSFER_TO_L2,
        explorerName: ETHERSCAN,
        explorerUrl: etherscanTxUrl(l1hash),
        explorerLogo: <EtherscanLogo style={{margin: 'auto'}} />
      });
    } else {
      setNetworkData({
        message: TRANSFER_TO_L1_TXT,
        showStatusMsg: true,
        explorerName: VOYAGER,
        explorerUrl: voyagerTxUrl(l2hash),
        explorerLogo: <L2Logo style={{margin: 'auto'}} />
      });
    }
  }, []);

  const onClick = () => {
    utils.browser.openInNewTab(networkData.explorerUrl);
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
