import PropTypes from 'prop-types';
import React from 'react';

export const IncognitoMessage = ({txtParts}) => {
  return (
    <p>
      {txtParts[0]} <b>{txtParts[1]}</b> {txtParts[2]}
    </p>
  );
};

IncognitoMessage.propTypes = {
  txtParts: PropTypes.array
};
