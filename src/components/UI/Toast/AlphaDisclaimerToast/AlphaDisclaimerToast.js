import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as StarknetIcon} from '../../../../assets/svg/chains/starknet.svg';
import {useColors, useToastsTranslation} from '../../../../hooks';
import {CallToActionToast} from '../CallToActionToast/CallToActionToast';

export const AlphaDisclaimerToast = ({t, onDismiss}) => {
  const {alphaDisclaimerNotice} = useToastsTranslation();
  const {colorInternationalOrangeAerospace} = useColors();

  return (
    <CallToActionToast
      backgroundColor={colorInternationalOrangeAerospace}
      bodyTxt={alphaDisclaimerNotice.bodyTxt}
      sideIcon={<StarknetIcon width={110} />}
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
