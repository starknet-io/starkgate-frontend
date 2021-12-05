import React, {useEffect, useState} from 'react';

import EthereumLogo from '../../../assets/svg/tokens/eth.svg';
import StarkNetLogo from '../../../assets/svg/tokens/starknet.svg';
import {useColors} from '../../../hooks';
import {useTokens} from '../../../hooks/useTokens';
import {BackButton, Loading, Menu, MenuTitle} from '../../UI';
import {LoadingSize} from '../../UI/Loading/Loading.enums';
import {useBridgeActions} from '../Bridge/Bridge.hooks';
import {useTransferActions, useTransferData} from '../Transfer/Transfer.hooks';
import {SearchToken} from './SearchToken/SearchToken';
import styles from './SelectToken.module.scss';
import {TITLE_TXT} from './SelectToken.strings';
import {SelectTokenList} from './SelectTokenList/SelectTokenList';

export const SelectToken = () => {
  const {isLoading, tokensData} = useTokens();
  const {colorBeta} = useColors();
  const {showTransferMenu} = useBridgeActions();
  const {isEthereum, fromNetwork} = useTransferData();
  const {selectToken} = useTransferActions();
  const [searchTokens, setSearchTokens] = useState(tokensData);

  useEffect(() => {
    setSearchTokens(tokensData);
  }, [tokensData]);

  const onTokenSelect = tokenData => {
    selectToken(tokenData);
    showTransferMenu();
  };

  return (
    <Menu>
      <div className={styles.selectToken}>
        <BackButton onClick={showTransferMenu} />
        <MenuTitle text={TITLE_TXT} />
        <MenuTitle color={colorBeta} text={fromNetwork.name} />
        <>
          {isLoading && (
            <div className={styles.loadingContainer}>
              <Loading size={LoadingSize.EXTRA_LARGE} />
            </div>
          )}
          {!isLoading && (
            <>
              <SearchToken
                tokens={tokensData}
                onSearchResults={searchResult => setSearchTokens(searchResult)}
              />
              <SelectTokenList tokens={searchTokens} onClick={onTokenSelect} />
            </>
          )}
        </>
        <div
          className={styles.background}
          style={{
            backgroundImage: `url(${isEthereum ? EthereumLogo : StarkNetLogo})`
          }}
        />
      </div>
    </Menu>
  );
};
