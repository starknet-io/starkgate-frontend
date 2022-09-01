import {ChainType} from '@starkware-industries/commons-js-enums';
import {buildDynamicURL, evaluate, openInNewTab} from '@starkware-industries/commons-js-utils';
import React from 'react';

import {sources, providers, depositConfig, withdrawConfig} from '../../../config/sources';
import {useEnvs, useProvidersTranslation, useSourceTranslation} from '../../../hooks';
import {useSource} from '../../../providers/SourceProvider';
import {useBridgeIsFull, useIsL1} from '../../../providers/TransferProvider';
import {useL2Wallet} from '../../../providers/WalletsProvider';
import {Badge, ChoiceItemType, CircleLogoSize, MenuBackground, MultiChoiceList} from '../../UI';
import {SourceSelect} from '../../UI/SourceSelect/SourceSelect';
import styles from './ProvidersMenu.module.scss';

export const ProvidersMenu = () => {
  const {SUPPORTED_L1_CHAIN_ID} = useEnvs();
  const {bridgeIsFull} = useBridgeIsFull();
  const [isL1] = useIsL1();
  const {fromTxt, toTxt} = useSourceTranslation();
  const {source} = useSource();
  const {descriptionTxt} = useProvidersTranslation();
  const {account: accountL2} = useL2Wallet();
  const dynamicQsValues = {
    accountL2
  };

  const getDescription = () => {
    const {description, label} = sources[source];
    return description || evaluate(descriptionTxt, {source: label});
  };

  const getProviders = source => {
    const config = isL1 ? depositConfig : withdrawConfig;
    const map = Object.values(config).find(map => map[source]);
    const providerIds = map[source];
    return providers
      .filter(({id}) => providerIds.includes(id))
      .map(provider => {
        const {link, label} = provider;
        const {url, qsParams} = link[SUPPORTED_L1_CHAIN_ID] || link[ChainType.L1.MAIN];
        const dynamicUrl = buildDynamicURL(url, qsParams, dynamicQsValues);
        return {
          ...provider,
          name: label,
          description: url,
          type: ChoiceItemType.LINK,
          size: CircleLogoSize.SMALL,
          onClick: () => {
            openInNewTab(dynamicUrl);
          }
        };
      });
  };

  return (
    <>
      <MenuBackground>
        <Badge isDisabled={bridgeIsFull} text={isL1 ? fromTxt : toTxt} />
        <div className={styles.selectContainer}>
          <SourceSelect />
        </div>
        <div className={styles.description}>{getDescription()} </div>
      </MenuBackground>
      <MultiChoiceList choices={getProviders(source)} />
    </>
  );
};
