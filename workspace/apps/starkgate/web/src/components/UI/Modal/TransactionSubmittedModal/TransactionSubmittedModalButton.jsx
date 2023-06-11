import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as EtherscanLogo} from '@assets/svg/etherscan.svg';
import {ReactComponent as StarkScanLogo} from '@assets/svg/starkscan.svg';
import {ReactComponent as VoyagerLogo} from '@assets/svg/voyager.svg';
import {useColors, useConstants, useEnvs, useTransactionSubmittedModalTranslation} from '@hooks';
import {isDeposit, isWithdrawal} from '@starkgate/shared';
import {evaluate} from '@starkware-webapps/utils';
import {openInNewTab} from '@starkware-webapps/utils-browser';
import {Button, Circle} from '@ui';

const TransactionSubmittedModalButton = ({transfer, buttonProps}) => {
  const {ETHERSCAN, VOYAGER, STARKSCAN} = useConstants();
  const {ETHERSCAN_TX_URL, VOYAGER_TX_URL, STARKSCAN_TX_URL, STARKSCAN_ETH_TX_URL} = useEnvs();
  const {colorIndigo, colorWhite, colorGainsboro} = useColors();
  const {btnTxt} = useTransactionSubmittedModalTranslation();
  const {type, l2TxHash, l1TxHash} = transfer;
  const isTransferCompleted = l1TxHash && l2TxHash;

  let explorers;

  if (isDeposit(type) || isTransferCompleted) {
    explorers = [
      {
        name: ETHERSCAN,
        url: ETHERSCAN_TX_URL(l1TxHash),
        logo: <EtherscanLogo />
      },
      {
        name: STARKSCAN,
        url: STARKSCAN_ETH_TX_URL(l1TxHash),
        logo: <StarkScanLogo />
      }
    ];
  }

  if (isWithdrawal(type) && !isTransferCompleted) {
    explorers = [
      {
        name: VOYAGER,
        url: VOYAGER_TX_URL(l2TxHash),
        logo: <VoyagerLogo />
      },
      {
        name: STARKSCAN,
        url: STARKSCAN_TX_URL(l2TxHash),
        logo: <StarkScanLogo />
      }
    ];
  }

  const onClick = url => {
    openInNewTab(url);
  };

  return explorers.map(explorer => (
    <Button
      key={explorer.name}
      colorBackground={colorWhite}
      colorBorder={colorIndigo}
      colorText={colorIndigo}
      height={48}
      iconLeft={
        <Circle color={colorGainsboro} size={37} style={{margin: '0'}}>
          {explorer.logo}
        </Circle>
      }
      text={evaluate(btnTxt, {explorer: explorer.name})}
      width={'100%'}
      onClick={() => onClick(explorer.url)}
      {...buttonProps}
    />
  ));
};

TransactionSubmittedModalButton.propTypes = {
  transfer: PropTypes.object,
  buttonProps: PropTypes.object
};

export default TransactionSubmittedModalButton;
