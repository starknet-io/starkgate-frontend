import React, {useEffect, useState} from 'react';

import {track, TrackEvent} from '../../../analytics';
import L1Logo from '../../../assets/svg/tokens/eth.svg';
import L2Logo from '../../../assets/svg/tokens/starknet.svg';
import {useColors, useTranslation} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {useTokens} from '../../../providers/TokensProvider';
import {useTransfer} from '../../../providers/TransferProvider';
import {BackButton, Menu, MenuTitle, RefreshIcon, SearchToken, SelectTokenList} from '../../UI';
import styles from './SelectToken.module.scss';

export const SelectToken = () => {
  const {titleTxt} = useTranslation('menus.selectToken');
  const {tokens, updateTokenBalance} = useTokens();
  const {colorBeta} = useColors();
  const {showTransferMenu} = useMenu();
  const {isL1, fromNetwork} = useTransfer();
  const {selectToken} = useTransfer();
  const [searchTokens, setSearchTokens] = useState(tokens);

  useEffect(() => {
    setSearchTokens(tokens);
  }, [tokens]);

  const onTokenSelect = tokenData => {
    const {symbol} = tokenData;
    track(TrackEvent.SELECT_TOKEN.TOKEN_SELECTED, {symbol});
    selectToken(symbol);
    showTransferMenu();
  };

  return (
    <Menu>
      <div className={styles.selectToken}>
        <BackButton onClick={() => showTransferMenu()} />
        <MenuTitle text={titleTxt} />
        <div className={styles.name}>
          <MenuTitle color={colorBeta} text={fromNetwork.name} />
          <RefreshIcon onClick={updateTokenBalance} />
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
