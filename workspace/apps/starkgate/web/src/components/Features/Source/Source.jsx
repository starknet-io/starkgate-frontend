import React from 'react';

import {ProvidersMenu, Transfer} from '@features';
import {useSourceTranslation, useTransferTracking} from '@hooks';
import {useIsL1, useIsL2, useSource, useTransfer} from '@providers';
import {TransferType, isDeposit, isWithdrawal} from '@starkgate/shared';
import {isL1Network} from '@starkware-webapps/enums';
import {TextSwitch} from '@starkware-webapps/ui';
import {Menu} from '@ui';

import styles from './Source.module.scss';

export const Source = () => {
  const [, trackSwapNetworks] = useTransferTracking();
  const [, swapToL1] = useIsL1();
  const [isL2, swapToL2] = useIsL2();
  const {action} = useTransfer();
  const {depositTxt, withdrawTxt} = useSourceTranslation();
  const {source, selectDefaultSource} = useSource();

  const switchTabs = [
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

  return (
    <Menu>
      <div className={styles.source}>
        <TextSwitch tabs={switchTabs} />
        {isL1Network(source) ? <Transfer onNetworkSwap={onNetworkSwap} /> : <ProvidersMenu />}
      </div>
    </Menu>
  );
};
