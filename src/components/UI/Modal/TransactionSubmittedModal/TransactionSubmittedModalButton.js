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
import {evaluate, openInNewTab} from '../../../../utils';
import {Button} from '../../Button/Button';
import {Circle} from '../../Circle/Circle';

const TransactionSubmittedModalButton = ({transfer}) => {
  const {ETHERSCAN, VOYAGER} = useConstants();
  const {ETHERSCAN_TX_URL, VOYAGER_TX_URL} = useEnvs();
  const {colorIndigo, colorWhite, colorGainsboro} = useColors();
  const {btnTxt} = useTransactionSubmittedModalTranslation();
  const {type, l2hash, l1hash} = transfer;
  const isTransferCompleted = l1hash && l2hash;

  let explorer;

  if (type === ActionType.TRANSFER_TO_L2 || isTransferCompleted) {
    explorer = {
      name: ETHERSCAN,
      url: ETHERSCAN_TX_URL(l1hash),
      logo: <EtherscanLogo />
    };
  }

  if (type === ActionType.TRANSFER_TO_L1 && !isTransferCompleted) {
    explorer = {
      name: VOYAGER,
      url: VOYAGER_TX_URL(l2hash),
      logo: <StarkNetLogo />
    };
  }

  const onClick = () => {
    openInNewTab(explorer.url);
  };

  return (
    <Button
      colorBackground={colorWhite}
      colorBorder={colorIndigo}
      colorText={colorIndigo}
      height={40}
      iconLeft={
        <Circle color={colorGainsboro} size={35}>
          {explorer.logo}
        </Circle>
      }
      text={evaluate(btnTxt, {explorer: explorer.name})}
      width={'100%'}
      onClick={onClick}
    />
  );
};

TransactionSubmittedModalButton.propTypes = {
  transfer: PropTypes.object
};

export default TransactionSubmittedModalButton;
