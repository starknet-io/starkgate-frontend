import React, {useEffect, useState} from 'react';

import L1Logo from '../../../assets/svg/tokens/eth.svg';
import L2Logo from '../../../assets/svg/tokens/starknet.svg';
import {useColors} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {useTokens} from '../../../providers/TokensProvider';
import {BackButton, Menu, MenuTitle, SearchToken, SelectTokenList} from '../../UI';
import {useTransferActions, useTransferData} from '../Transfer/Transfer.hooks';
import styles from './SelectToken.module.scss';
import {TITLE_TXT} from './SelectToken.strings';

export const SelectToken = () => {
  const {tokens} = useTokens();
  const {colorBeta} = useColors();
  const {showTransferMenu} = useMenu();
  const {isL1, fromNetwork} = useTransferData();
  const {selectToken} = useTransferActions();
  const [searchTokens, setSearchTokens] = useState(tokens);

  useEffect(() => {
    setSearchTokens(tokens);
  }, [tokens]);

  const onTokenSelect = tokenData => {
    const {symbol} = tokenData;
    selectToken(symbol);
    showTransferMenu();
  };

  return (
    <Menu>
      <div className={styles.selectToken}>
        <BackButton onClick={() => showTransferMenu()} />
        <MenuTitle text={TITLE_TXT} />
        <MenuTitle color={colorBeta} text={fromNetwork.name} />
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
