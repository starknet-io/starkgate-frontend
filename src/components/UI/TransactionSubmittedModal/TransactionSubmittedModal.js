import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as EtherscanLogo} from '../../../assets/svg/etherscan.svg';
import {ReactComponent as StarknetLogo} from '../../../assets/svg/tokens/starknet.svg';
import {LINKS} from '../../../constants';
import {ActionType} from '../../../enums';
import {useColors} from '../../../hooks';
import {useWallets} from '../../../providers/WalletsProvider';
import {openInNewTab} from '../../../utils';
import {Button} from '../Button/Button';
import {Circle} from '../Circle/Circle';
import {BODY_TXT_PARTS, BTN_TEXT} from './TransactionSubmittedModal.strings';

const TransactionSubmittedModal = ({tx}) => {
  const {colorAlpha3, colorWhite, colorWhite1} = useColors();
  const {chainId} = useWallets();

  const getExplorerName = () => {
    return tx.type === ActionType.TRANSFER_TO_STARKNET ? LINKS.ETHERSCAN.text : LINKS.VOYAGER.text;
  };

  const getExplorerUrl = () => {
    return tx.type === ActionType.TRANSFER_TO_STARKNET
      ? LINKS.ETHERSCAN.txUrl(chainId, tx.eth_hash)
      : LINKS.VOYAGER.txUrl(chainId, tx.starknet_hash);
  };

  const getExplorerLogo = () => {
    const Logo = tx.type === ActionType.TRANSFER_TO_STARKNET ? EtherscanLogo : StarknetLogo;
    return <Logo style={{margin: 'auto'}} />;
  };

  const onClick = () => {
    openInNewTab(getExplorerUrl());
  };

  return (
    <div>
      <p>
        <b>{BODY_TXT_PARTS[0]}</b>
        {BODY_TXT_PARTS[1]}
      </p>
      <center>
        <Button
          colorBackground={colorWhite}
          colorBorder={colorAlpha3}
          colorText={colorAlpha3}
          icon={
            <Circle color={colorWhite1} size={40}>
              {getExplorerLogo()}
            </Circle>
          }
          style={{
            borderRadius: '7px',
            borderWidth: '2px',
            fontSize: '16px',
            marginTop: '25px',
            height: '50px'
          }}
          text={BTN_TEXT(getExplorerName())}
          onClick={onClick}
        />
      </center>
    </div>
  );
};

TransactionSubmittedModal.propTypes = {
  tx: PropTypes.object
};

export default TransactionSubmittedModal;
