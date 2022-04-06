import PropTypes from 'prop-types';
import React from 'react';

import {LoginMessage} from './LoginMessage';

export const IncognitoMessage = ({txtParts}) => {
  return (
    <p>
      {txtParts[0]} <b>{txtParts[1]}</b> {txtParts[2]}
    </p>
  );
};

LoginMessage.propTypes = {
  txtParts: PropTypes.array
};
