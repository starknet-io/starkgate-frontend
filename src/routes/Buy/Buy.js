import React from 'react';

import {MultiChoiceMenu} from '../../components/UI';
import {useBuyProviders, useBuyTranslation} from '../../hooks';
import {openInNewTab} from '../../utils';

export const Buy = () => {
  const {titleTxt, descriptionTxt} = useBuyTranslation();
  const buyProviders = useBuyProviders();

  const mapBuyProviders = () => {
    return buyProviders.map(p => {
      return {
        ...p,
        onClick: () => {
          openInNewTab(p.url);
        }
      };
    });
  };

  return (
    <MultiChoiceMenu choices={mapBuyProviders()} description={descriptionTxt} title={titleTxt} />
  );
};
