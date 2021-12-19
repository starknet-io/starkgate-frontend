import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as EtherscanLogo} from '../../../assets/svg/etherscan.svg';
import {byChainId} from '../../../enums';
import {useColors} from '../../../hooks';
import {useWallets} from '../../../providers/WalletsProvider';
import {openInNewTab} from '../../../utils';
import {Button} from '../Button/Button';
import {Circle} from '../Circle/Circle';
import {ETHERSCAN_TX_URL} from './TransactionSubmittedModal.constants';
import {BTN_TEXT, DEPOSIT_MESSAGE_TXT_PARTS} from './TransactionSubmittedModal.strings';

const TransactionSubmittedModal = ({tx}) => {
  const {colorAlpha3, colorWhite, colorWhite1} = useColors();
  const {chainId} = useWallets();

  const onClick = () => {
    openInNewTab(ETHERSCAN_TX_URL(byChainId(chainId).blockExplorerUrl, tx.eth_hash));
  };

  return (
    <div>
      <center>
        <p>
          <b>{DEPOSIT_MESSAGE_TXT_PARTS[0]}</b>
          {DEPOSIT_MESSAGE_TXT_PARTS[1]}
        </p>
        <Button
          colorBackground={colorWhite}
          colorBorder={colorAlpha3}
          colorText={colorAlpha3}
          icon={
            <Circle color={colorWhite1} size={40}>
              <EtherscanLogo style={{margin: 'auto'}} />
            </Circle>
          }
          style={{
            borderRadius: '7px',
            borderWidth: '2px',
            fontSize: '16px',
            height: '60px'
          }}
          text={BTN_TEXT}
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
