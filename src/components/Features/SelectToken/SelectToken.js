import React, {useEffect, useState} from 'react';

import L1Logo from '../../../assets/svg/tokens/eth.svg';
import L2Logo from '../../../assets/svg/tokens/starknet.svg';
import {useColors, useSelectTokenTranslation, useSelectTokenTracking} from '../../../hooks';
import {useLogin} from '../../../providers/AppProvider';
import {useMenu} from '../../../providers/MenuProvider';
import {useTokens} from '../../../providers/TokensProvider';
import {useTransfer} from '../../../providers/TransferProvider';
import {BackButton, Menu, MenuTitle, RefreshIcon, SearchToken, SelectTokenList} from '../../UI';
import styles from './SelectToken.module.scss';

export const SelectToken = () => {
  const [trackSelectToken] = useSelectTokenTracking();
  const {titleTxt} = useSelectTokenTranslation();
  const {tokens, updateTokenBalance} = useTokens();
  const {colorBeta} = useColors();
  const {showTransferMenu} = useMenu();
  const {isL1, fromNetwork} = useTransfer();
  const {selectToken} = useTransfer();
  const [searchTokens, setSearchTokens] = useState(tokens);
  const {isLoggedIn} = useLogin();

  useEffect(() => {
    setSearchTokens(tokens);
  }, [tokens]);

  const onTokenSelect = tokenData => {
    const {symbol} = tokenData;
    trackSelectToken(symbol);
    selectToken(symbol);
    showTransferMenu();
  };

  return (
    <Menu>
      <div className={styles.selectToken}>
        <BackButton onClick={() => showTransferMenu()} />
        <MenuTitle text={titleTxt} />
        <div className={styles.name}>
          <MenuTitle color={colorBeta} text={fromNetwork} />
          <RefreshIcon onClick={updateTokenBalance} />
        </div>
        <SearchToken
          tokens={tokens}
          onSearchResults={searchResult => setSearchTokens(searchResult)}
        />
        <SelectTokenList tokens={searchTokens} showBalances={isLoggedIn} onClick={onTokenSelect} />
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
