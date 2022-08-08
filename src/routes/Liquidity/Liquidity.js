import React from 'react';

import {ChoiceItemType, MultiChoiceMenu} from '../../components/UI';
import {useLiquidityProviders, useLiquidityTranslation} from '../../hooks';
import {useL2Wallet} from '../../providers/WalletsProvider';
import {openInNewTab, buildDynamicURL} from '../../utils';

export const Liquidity = () => {
  const {account: accountL2} = useL2Wallet();
  const {titleTxt, descriptionTxt} = useLiquidityTranslation();
  const liquidityProviders = useLiquidityProviders();

  const dynamicQsValues = {
    accountL2
  };

  const mapLiquidityProviders = () => {
    return liquidityProviders
      .filter(p => p.link)
      .map(p => {
        const {link} = p;
        const {url, qsParams} = link;
        p.url = buildDynamicURL(url, qsParams, dynamicQsValues);
        return {
          ...p,
          type: ChoiceItemType.LINK,
          onClick: () => {
            openInNewTab(p.url);
          }
        };
      });
  };

  return (
    <MultiChoiceMenu
      choices={mapLiquidityProviders()}
      description={descriptionTxt}
      title={titleTxt}
    />
  );
};
