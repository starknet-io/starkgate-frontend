import PropTypes from 'prop-types';

export const BlockExplorerPropTypes = {
  account: PropTypes.string,
  tx: PropTypes.string,
  isDisabled: PropTypes.bool,
  isL1: PropTypes.bool,
  isLarge: PropTypes.bool,
  onClick: PropTypes.func
};
