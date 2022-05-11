import React from 'react';

import {MultiChoiceMenu} from '../../components/UI';
import BuyProviders from '../../config/buy';
import {useBuyTranslation} from '../../hooks';
import {openInNewTab} from '../../utils';

export const Buy = () => {
  const {titleTxt, descriptionTxt} = useBuyTranslation();

  const mapBuyProviders = () => {
    return BuyProviders.map(provider => {
      return {
        ...provider,
        onClick: () => {
          openInNewTab(provider.url);
        }
      };
    });
  };

  return (
    <MultiChoiceMenu choices={mapBuyProviders()} description={descriptionTxt} title={titleTxt} />
  );
};
