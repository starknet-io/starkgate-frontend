import React from 'react';

import sourceMap, {SourceGroup} from '../../../config/sources';
import {ActionType} from '../../../enums';
import {useTransferTracking, useTransferTranslation} from '../../../hooks';
import {useSource} from '../../../providers/SourceProvider';
import {useIsL1, useIsL2, useTransfer} from '../../../providers/TransferProvider';
import {Menu, TransferMenuTab} from '../../UI';
import {EthereumBridge} from '../EthereumBridge/EthereumBridge';
import {OtherBridge} from '../OtherBridge/OtherBridge';
import styles from './Transfer.module.scss';

export const Transfer = () => {
  const [trackSwapNetworks] = useTransferTracking();
  const [, swapToL1] = useIsL1();
  const [isL2, swapToL2] = useIsL2();
  const {action} = useTransfer();
  const {depositTxt, withdrawTxt} = useTransferTranslation();
  const {group, selectGroup, selectSource} = useSource();

  const tabs = [
    {
      text: depositTxt,
      isActive: action === ActionType.TRANSFER_TO_L2,
      onClick: () => {
        if (!sourceMap[group].deposit_sources && !sourceMap[group].sources) {
          selectGroup(SourceGroup.ETHEREUM);
          selectSource(sourceMap[SourceGroup.ETHEREUM].sources[0]);
        }
        onNetworkTabClick(ActionType.TRANSFER_TO_L2);
      }
    },
    {
      text: withdrawTxt,
      isActive: action === ActionType.TRANSFER_TO_L1,
      onClick: () => {
        if (!sourceMap[group].withdraw_sources && !sourceMap[group].sources) {
          selectGroup(SourceGroup.ETHEREUM);
          selectSource(sourceMap[SourceGroup.ETHEREUM].sources[0]);
        }
        onNetworkTabClick(ActionType.TRANSFER_TO_L1);
      }
    }
  ];

  const onSwapClick = () => {
    trackSwapNetworks();
    isL2 ? swapToL1() : swapToL2();
  };

  const onNetworkTabClick = tab => {
    if (action !== tab) {
      onSwapClick();
    }
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => {
      return (
        <TransferMenuTab
          key={index}
          isActive={tab.isActive}
          text={tab.text}
          onClick={tab.onClick}
        />
      );
    });
  };

  return (
    <Menu>
      <div className={styles.transfer}>
        <div className={styles.tabsContainer}>{renderTabs()}</div>
        {group === SourceGroup.ETHEREUM ? (
          <EthereumBridge onSwapClick={onSwapClick} />
        ) : (
          <OtherBridge />
        )}
      </div>
    </Menu>
  );
};
