import PropTypes from 'prop-types';
import React from 'react';

import {useConstants, useTransferTranslation} from '@hooks';
import {useTransfer} from '@providers';
import {CheckboxWithText} from '@ui';

export const FastWithdrawalCheckbox = ({checked}) => {
  const {setFastWithdrawal} = useTransfer();
  const {enableFastWithdrawal, readMoreTxt} = useTransferTranslation();
  const {MAKER_TELEPORT_LEARN_MORE_URL} = useConstants();

  return (
    <CheckboxWithText
      checked={checked}
      linkTxt={readMoreTxt}
      linkUrl={MAKER_TELEPORT_LEARN_MORE_URL}
      message={enableFastWithdrawal}
      onChange={event => setFastWithdrawal(event.currentTarget.checked)}
    />
  );
};

FastWithdrawalCheckbox.propTypes = {
  checked: PropTypes.bool
};
