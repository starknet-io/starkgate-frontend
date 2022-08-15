import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as StarknetIcon} from '../../../../assets/svg/chains/starknet.svg';
import {useToastsTranslation} from '../../../../hooks';
import {CallToActionToast} from '../CallToActionToast/CallToActionToast';

export const AlphaDisclaimerToast = ({t, onDismiss}) => {
  const {alphaDisclaimerNotice} = useToastsTranslation();

  return (
    <CallToActionToast
      bodyTxt={alphaDisclaimerNotice.bodyTxt}
      sideIcon={<StarknetIcon style={{opacity: 0.8}} width={110} />}
      t={t}
      titleTxt={alphaDisclaimerNotice.titleTxt}
      onDismiss={onDismiss}
    />
  );
};

AlphaDisclaimerToast.propTypes = {
  t: PropTypes.object,
  onDismiss: PropTypes.func
};
