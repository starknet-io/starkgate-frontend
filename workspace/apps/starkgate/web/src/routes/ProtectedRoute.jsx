import PropTypes from 'prop-types';
import React from 'react';
import {Navigate} from 'react-router-dom';

export const ProtectedRoute = ({isAllowed, redirectPath, children}) => {
  if (!isAllowed) {
    return <Navigate replace to={redirectPath} />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool,
  redirectPath: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
