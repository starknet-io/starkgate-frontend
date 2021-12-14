import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as EtherscanLogo} from '../../../assets/svg/etherscan.svg';
import {toChainName} from '../../../enums';
import {useColors} from '../../../hooks';
import {useWallets} from '../../../providers/WalletsProvider/hooks';
import {openInNewTab} from '../../../utils';
import {Button} from '../Button/Button';
import {Circle} from '../Circle/Circle';
import {ETHERSCAN_TX_URL} from './TransactionSubmittedModal.constants';
import {BTN_TEXT} from './TransactionSubmittedModal.strings';

const TransactionSubmittedModal = ({transactionHash}) => {
  const {colorAlpha3, colorWhite, colorWhite1} = useColors();
  const {chainId} = useWallets();

  const onClick = () => {
    let chainName = toChainName(chainId);
    chainName += chainName && '.';
    openInNewTab(ETHERSCAN_TX_URL(chainName, transactionHash));
  };

  return (
    <div className="center">
      <br />
      <Button
        colorBackground={colorWhite}
        colorBorder={colorAlpha3}
        colorText={colorAlpha3}
        text={BTN_TEXT}
        icon={
          <Circle size={40} color={colorWhite1}>
            <EtherscanLogo style={{margin: 'auto'}} />
          </Circle>
        }
        onClick={onClick}
        style={{
          borderRadius: '7px',
          borderWidth: '2px',
          fontSize: '16px',
          height: '60px'
        }}
      />
    </div>
  );
};

TransactionSubmittedModal.propTypes = {
  transactionHash: PropTypes.string
};

export default TransactionSubmittedModal;
