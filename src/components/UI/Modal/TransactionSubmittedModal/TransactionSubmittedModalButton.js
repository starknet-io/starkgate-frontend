import {openInNewTab, evaluate} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as EtherscanLogo} from '../../../../assets/svg/etherscan.svg';
import {ReactComponent as StarkScanLogo} from '../../../../assets/svg/starkscan.svg';
import {ReactComponent as VoyagerLogo} from '../../../../assets/svg/voyager.svg';
import {ActionType} from '../../../../enums';
import {
  useColors,
  useConstants,
  useEnvs,
  useTransactionSubmittedModalTranslation
} from '../../../../hooks';
import {Button} from '../../Button/Button';
import {Circle} from '../../Circle/Circle';

const TransactionSubmittedModalButton = ({transfer, buttonProps}) => {
  const {ETHERSCAN, VOYAGER, STARKSCAN} = useConstants();
  const {ETHERSCAN_TX_URL, VOYAGER_TX_URL, STARKSCAN_TX_URL, STARKSCAN_ETH_TX_URL} = useEnvs();
  const {colorIndigo, colorWhite, colorGainsboro} = useColors();
  const {btnTxt} = useTransactionSubmittedModalTranslation();
  const {type, l2hash, l1hash} = transfer;
  const isTransferCompleted = l1hash && l2hash;

  let explorers;

  if (type === ActionType.TRANSFER_TO_L2 || isTransferCompleted) {
    explorers = [
      {
        name: ETHERSCAN,
        url: ETHERSCAN_TX_URL(l1hash),
        logo: <EtherscanLogo />
      },
      {
        name: STARKSCAN,
        url: STARKSCAN_ETH_TX_URL(l1hash),
        logo: <StarkScanLogo />
      }
    ];
  }

  if (type === ActionType.TRANSFER_TO_L1 && !isTransferCompleted) {
    explorers = [
      {
        name: VOYAGER,
        url: VOYAGER_TX_URL(l2hash),
        logo: <VoyagerLogo />
      },
      {
        name: STARKSCAN,
        url: STARKSCAN_TX_URL(l2hash),
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
