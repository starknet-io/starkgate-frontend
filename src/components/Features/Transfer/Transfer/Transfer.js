import React, {useEffect} from 'react';

import {ActionType, NetworkType} from '../../../../enums';
import {useTokens} from '../../../../providers/TokensProvider/hooks';
import {Loading, Menu} from '../../../UI';
import {LoadingSize} from '../../../UI/Loading/Loading.enums';
import {EthereumNetwork} from '../EthereumNetwork/EthereumNetwork';
import {NetworkSwap} from '../NetworkSwap/NetworkSwap';
import {StarknetNetwork} from '../StarknetNetwork/StarknetNetwork';
import {TransferMenuTab} from '../TransferMenuTab/TransferMenuTab';
import {useIsEthereum, useIsStarknet, useTransferActions, useTransferData} from './Transfer.hooks';
import styles from './Transfer.module.scss';

export const Transfer = () => {
  const [isEthereum, setEthereum] = useIsEthereum();
  const [isStarknet, setStarknet] = useIsStarknet();
  const {selectedToken, action} = useTransferData();
  const {selectToken} = useTransferActions();
  const tokens = useTokens();

  useEffect(() => {
    !selectedToken && selectToken(tokens[0]);
  }, []);

  const renderTabs = () => {
    return Object.values(ActionType).map((tab, index) => {
      return (
        <TransferMenuTab
          key={index}
          isActive={action === tab}
          text={
            tab === ActionType.TRANSFER_TO_STARKNET
              ? NetworkType.ETHEREUM.name
              : NetworkType.STARKNET.name
          }
          onClick={() => action !== tab && onSwapClick()}
        />
      );
    });
  };

  const onSwapClick = () => {
    !isEthereum ? setEthereum() : setStarknet();
  };

  const renderEthereumNetwork = () => <EthereumNetwork />;

  const renderStarknetNetwork = () => <StarknetNetwork />;

  return (
    <Menu>
      <div className={styles.transfer}>
        <div className={styles.tabsContainer}>{renderTabs()}</div>
        {!selectedToken && (
          <center>
            <Loading size={LoadingSize.EXTRA_LARGE} />
          </center>
        )}
        {selectedToken && (
          <>
            {isEthereum ? renderEthereumNetwork() : renderStarknetNetwork()}
            <NetworkSwap isFlipped={isStarknet} onClick={onSwapClick} />
            {isEthereum ? renderStarknetNetwork() : renderEthereumNetwork()}
          </>
        )}
      </div>
    </Menu>
  );
};
