import React from 'react';

import utils from '../../../../utils';

const INCOGNITO_TXT_PARTS = utils.getTranslation('modals.onboarding.incognito_txt_parts');

export const IncognitoMessage = () => {
  return (
    <p>
      {INCOGNITO_TXT_PARTS[0]} <b>{INCOGNITO_TXT_PARTS[1]}</b> {INCOGNITO_TXT_PARTS[2]}
    </p>
  );
};
