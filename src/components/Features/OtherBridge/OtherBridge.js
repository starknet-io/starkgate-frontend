import {ChainType} from '@starkware-industries/commons-js-enums';
import React from 'react';

import Providers from '../../../config/providers';
import sourceMap from '../../../config/sources';
import {useLiquidityProviders, useTransferTranslation, useEnvs} from '../../../hooks';
import {useSource} from '../../../providers/SourceProvider';
import {useBridgeIsFull, useIsL1} from '../../../providers/TransferProvider';
import {useL2Wallet} from '../../../providers/WalletsProvider';
import {buildDynamicURL, evaluate, openInNewTab} from '../../../utils';
import {Badge, ChoiceItemType, MenuBackground, MultiChoiceList} from '../../UI';
import {SourceSelect} from '../../UI/SourceSelect/SourceSelect';

export const OtherBridge = () => {
  const {SUPPORTED_L1_CHAIN_ID} = useEnvs();
  const {bridgeIsFull} = useBridgeIsFull();
  const [isL1] = useIsL1();
  const {fromTxt, toTxt} = useTransferTranslation();
  const {group, source} = useSource();
  const {account: accountL2} = useL2Wallet();
  const dynamicQsValues = {
    accountL2
  };

  const getDescription = () => {
    return source.description || evaluate(sourceMap[group].description, {label: source.label});
  };

  const getProviders = group => {
    const providerIdList =
      (isL1 ? group.deposit_providers : group.withdraw_providers) || group.providers;
    const providers = Providers.filter(({id}) => providerIdList.includes(id));
    return providers.map(provider => {
      const {link} = provider;
      const {url, qsParams} = link[SUPPORTED_L1_CHAIN_ID] || link[ChainType.L1.MAIN];
      const dynamicUrl = buildDynamicURL(url, qsParams, dynamicQsValues);
      return {
        ...provider,
        description: url,
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
        <SourceSelect />
        <div>{getDescription()} </div>
      </MenuBackground>
      <MultiChoiceList choices={getProviders(sourceMap[group])} type={ChoiceItemType.LINK} />
    </>
  );
};

OtherBridge.propTypes = {};
