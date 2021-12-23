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
import {BODY_TXT_PARTS, BTN_TEXT} from './TransactionSubmittedModal.strings';

const TransactionSubmittedModal = ({tx}) => {
  const {colorAlpha3, colorWhite, colorWhite1} = useColors();
  const {chainId} = useWallets();
  const [networkData, setNetworkData] = useState({});

  useEffect(() => {
    if (tx.type === ActionType.TRANSFER_TO_STARKNET || (tx.eth_hash && tx.starknet_hash)) {
      setNetworkData({
        explorerName: LINKS.ETHERSCAN.text,
        explorerUrl: LINKS.ETHERSCAN.txUrl(chainId, tx.eth_hash),
        explorerLogo: <EtherscanLogo style={{margin: 'auto'}} />
      });
    } else {
      setNetworkData({
        explorerName: LINKS.VOYAGER.text,
        explorerUrl: LINKS.VOYAGER.txUrl(chainId, tx.starknet_hash),
        explorerLogo: <StarknetLogo style={{margin: 'auto'}} />
      });
    }
  }, []);

  const onClick = () => {
    openInNewTab(networkData.explorerUrl);
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
              {networkData.explorerLogo}
            </Circle>
          }
          style={{
            borderRadius: '7px',
            borderWidth: '2px',
            fontSize: '16px',
            marginTop: '25px',
            height: '50px'
          }}
          text={BTN_TEXT(networkData.explorerName)}
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
