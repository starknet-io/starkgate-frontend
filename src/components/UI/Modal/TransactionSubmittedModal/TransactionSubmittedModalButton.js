import {openInNewTab, evaluate} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as StarkNetLogo} from '../../../../assets/svg/chains/starknet.svg';
import {ReactComponent as EtherscanLogo} from '../../../../assets/svg/etherscan.svg';
import {ActionType} from '../../../../enums';
import {
  useColorsWrapper,
  useConstantsWrapper,
  useEnvsWrapper,
  useTransactionSubmittedModalTranslation
} from '../../../../hooks';
import {Button} from '../../Button/Button';
import {Circle} from '../../Circle/Circle';

const TransactionSubmittedModalButton = ({transfer, buttonProps}) => {
  const {ETHERSCAN, VOYAGER} = useConstantsWrapper();
  const {ETHERSCAN_TX_URL, VOYAGER_TX_URL} = useEnvsWrapper();
  const {colorIndigo, colorWhite, colorGainsboro} = useColorsWrapper();
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
      height={48}
      iconLeft={
        <Circle color={colorGainsboro} size={37} style={{margin: '0'}}>
          {explorer.logo}
        </Circle>
      }
      text={evaluate(btnTxt, {explorer: explorer.name})}
      width={'100%'}
      onClick={onClick}
      {...buttonProps}
    />
  );
};

TransactionSubmittedModalButton.propTypes = {
  transfer: PropTypes.object,
  buttonProps: PropTypes.object
};

export default TransactionSubmittedModalButton;
