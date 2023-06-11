import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {useColors, useTranslation} from '@hooks';
import {evaluate, mergeDeep, shortenAddress} from '@starkware-webapps/utils';

import {Button} from '../../Button/Button';
import {CollapseExpand} from '../../CollapseExpand/CollapseExpand';
import {DynamicIcon} from '../../DynamicIcon/DynamicIcon';
import {ChainLabel} from '../ChainLabel/ChainLabel';
import {WalletMenu} from '../WalletMenu/WalletMenu';
import styles from './AccountWalletButton.module.scss';

export const WalletButtonIconSize = {
  SMALL: 10,
  MEDIUM: 20,
  LARGE: 30
};

export const AccountWalletButton = ({account, chain, logoPath, menuOptions, texts, onClick}) => {
  const {colorOrangeSoda, colorWhiteOp10, colorWhite, colorDarkBlueGray} = useColors();
  const {ACCOUNT_TXT} = mergeDeep(useTranslation('WalletButton'), texts);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onClick();
  };

  return (
    <>
      <Button
        className={styles.accountWalletButton}
        colorBackground={colorWhiteOp10}
        colorBackgroundHover={colorDarkBlueGray}
        colorBorder={colorOrangeSoda}
        colorText={colorWhite}
        iconLeft={
          <div>
            <DynamicIcon path={logoPath} size={WalletButtonIconSize.MEDIUM} />
          </div>
        }
        iconRight={
          <>
            <ChainLabel chain={chain} />
            {menuOptions.enable && <CollapseExpand isCollapsed={isMenuOpen} />}
          </>
        }
        text={evaluate(ACCOUNT_TXT, {address: shortenAddress(account)})}
        onClick={onButtonClick}
      />
      {menuOptions.enable && (
        <WalletMenu account={account} isOpen={isMenuOpen} logoPath={logoPath} {...menuOptions} />
      )}
    </>
  );
};

AccountWalletButton.propTypes = {
  account: PropTypes.string,
  chain: PropTypes.string,
  logoPath: PropTypes.string,
  menuOptions: PropTypes.object,
  texts: PropTypes.object,
  onClick: PropTypes.func
};
