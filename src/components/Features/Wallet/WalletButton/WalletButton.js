import React from 'react';

import {useColors} from '../../../../hooks';
import {formatAddress} from '../../../../utils';
import {Button, DynamicIcon} from '../../../UI';
import {useBridgeActions} from '../../Bridge/Bridge.hooks';
import {useWallets} from '../Wallet.hooks';
import {WALLET_LOGO_SIZE} from './WalletButton.constants';
import {BTN_TXT} from './WalletButton.strings';

export const WalletButton = () => {
  const {colorBeta, colorWhite} = useColors();
  const {showAccountMenu} = useBridgeActions();
  const {account, isConnected, logoPath} = useWallets();

  return (
    <>
      {isConnected && (
        <Button
          colorBackground="transparent"
          colorBorder={colorBeta}
          colorText={colorWhite}
          height={40}
          icon={<DynamicIcon path={logoPath} size={WALLET_LOGO_SIZE} />}
          style={{borderWidth: '2px'}}
          text={BTN_TXT(formatAddress(account))}
          onClick={showAccountMenu}
        />
      )}
    </>
  );
};
