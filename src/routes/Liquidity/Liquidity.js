import React from 'react';

import {MultiChoiceMenu} from '../../components/UI';
import {useLiquidityProviders, useLiquidityTranslation} from '../../hooks';
import {openInNewTab} from '../../utils';

export const Liquidity = () => {
  const {titleTxt, descriptionTxt} = useLiquidityTranslation();
  const liquidityProviders = useLiquidityProviders();

  const mapLiquidityProviders = () => {
    return liquidityProviders.map(p => {
      return {
        ...p,
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
