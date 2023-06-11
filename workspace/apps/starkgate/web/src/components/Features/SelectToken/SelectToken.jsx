import React, {useEffect, useState} from 'react';

import L1Logo from '@assets/svg/chains/ethereum.svg';
import L2Logo from '@assets/svg/chains/starknet.svg';
import {useColors, useSelectTokenTracking, useSelectTokenTranslation} from '@hooks';
import {useLogin, useMenu, useTokens, useTransfer} from '@providers';
import {BackButton, Menu, MenuTitle, RefreshIcon, SearchToken, SelectTokenList} from '@ui';

import styles from './SelectToken.module.scss';

export const SelectToken = () => {
  const [trackSelectToken] = useSelectTokenTracking();
  const {titleTxt} = useSelectTokenTranslation();
  const {tokens, updateTokenBalance} = useTokens();
  const {colorOrangeSoda} = useColors();
  const {showSourceMenu} = useMenu();
  const {isL1, fromNetwork} = useTransfer();
  const {selectToken} = useTransfer();
  const [searchTokens, setSearchTokens] = useState(tokens);
  const {isLoggedIn} = useLogin();

  useEffect(() => {
    setSearchTokens(tokens);
  }, [tokens]);

  const onTokenSelect = tokenData => {
    const {symbol} = tokenData;
    trackSelectToken({symbol});
    selectToken(symbol);
    showSourceMenu();
  };

  return (
    <Menu>
      <div className={styles.selectToken}>
        <BackButton onClick={() => showSourceMenu()} />
        <div className={styles.title}>
          <MenuTitle text={titleTxt} />
          <div className={styles.network}>
            <MenuTitle color={colorOrangeSoda} text={fromNetwork} />
            {isLoggedIn && <RefreshIcon onClick={updateTokenBalance} />}
          </div>
        </div>
        <SearchToken
          tokens={tokens}
          onSearchResults={searchResult => setSearchTokens(searchResult)}
        />
        <SelectTokenList tokens={searchTokens} onClick={onTokenSelect} />
        <div
          className={styles.background}
          style={{
            backgroundImage: `url(${isL1 ? L1Logo : L2Logo})`
          }}
        />
      </div>
    </Menu>
  );
};
