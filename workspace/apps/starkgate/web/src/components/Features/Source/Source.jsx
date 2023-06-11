import React from 'react';

import {ProvidersMenu, Transfer} from '@features';
import {useSourceTranslation, useTransferTracking} from '@hooks';
import {useIsL1, useIsL2, useSource, useTransfer} from '@providers';
import {TransferType, isDeposit, isWithdrawal} from '@starkgate/shared';
import {isL1Network} from '@starkware-webapps/enums';
import {Menu, SourceMenuTab} from '@ui';

import styles from './Source.module.scss';

export const Source = () => {
  const [, trackSwapNetworks] = useTransferTracking();
  const [, swapToL1] = useIsL1();
  const [isL2, swapToL2] = useIsL2();
  const {action} = useTransfer();
  const {depositTxt, withdrawTxt} = useSourceTranslation();
  const {source, selectDefaultSource} = useSource();

  const tabs = [
    {
      text: depositTxt,
      isActive: isDeposit(action),
      onClick: () => {
        onNetworkTabClick(TransferType.DEPOSIT);
      }
    },
    {
      text: withdrawTxt,
      isActive: isWithdrawal(action),
      onClick: () => {
        onNetworkTabClick(TransferType.WITHDRAWAL);
      }
    }
  ];

  const onNetworkSwap = () => {
    trackSwapNetworks();
    isL2 ? swapToL1() : swapToL2();
  };

  const onNetworkTabClick = tab => {
    if (action !== tab) {
      selectDefaultSource();
      onNetworkSwap();
    }
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => {
      return (
        <SourceMenuTab key={index} isActive={tab.isActive} text={tab.text} onClick={tab.onClick} />
      );
    });
  };

  return (
    <Menu>
      <div className={styles.source}>
        <div className={styles.tabsContainer}>{renderTabs()}</div>
        {isL1Network(source) ? <Transfer onNetworkSwap={onNetworkSwap} /> : <ProvidersMenu />}
      </div>
    </Menu>
  );
};
