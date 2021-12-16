import React from 'react';

import {ActionType, NetworkType} from '../../../../enums';
import {Menu} from '../../../UI';
import {EthereumNetwork} from '../EthereumNetwork/EthereumNetwork';
import {NetworkSwap} from '../NetworkSwap/NetworkSwap';
import {StarknetNetwork} from '../StarknetNetwork/StarknetNetwork';
import {TransferMenuTab} from '../TransferMenuTab/TransferMenuTab';
import {useIsEthereum, useIsStarknet, useTransferData} from './Transfer.hooks';
import styles from './Transfer.module.scss';

export const Transfer = () => {
  const [isEthereum, setEthereum] = useIsEthereum();
  const [isStarknet, setStarknet] = useIsStarknet();
  const {action} = useTransferData();

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
        {isEthereum ? renderEthereumNetwork() : renderStarknetNetwork()}
        <NetworkSwap isFlipped={isStarknet} onClick={onSwapClick} />
        {isEthereum ? renderStarknetNetwork() : renderEthereumNetwork()}
      </div>
    </Menu>
  );
};
