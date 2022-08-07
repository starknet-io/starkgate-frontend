import React from 'react';

import {ChoiceItemType, MultiChoiceMenu} from '../../components/UI';
import {useLiquidityProviders, useLiquidityTranslation} from '../../hooks';
import {openInNewTab} from '../../utils';

export const Liquidity = () => {
  const {titleTxt, descriptionTxt} = useLiquidityTranslation();
  const liquidityProviders = useLiquidityProviders();
  const mapLiquidityProviders = () => {
    return liquidityProviders.map(p => {
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
      toCenter
      choices={mapLiquidityProviders()}
      description={descriptionTxt}
      title={titleTxt}
    />
  );
};
