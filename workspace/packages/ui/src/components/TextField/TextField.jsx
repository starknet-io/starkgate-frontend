import PropTypes from 'prop-types';
import React from 'react';

import {TextField as MuiTextField} from '@mui/material';

import {TextFieldTheme} from './TextField.theme';

export const TextField = props => {
  const {error, helperText} = props;
  return (
    <TextFieldTheme error={error}>
      <MuiTextField
        {...props}
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true, ...props.InputProps}}
        helperText={error && helperText}
        margin={'normal'}
        variant={'standard'}
      />
    </TextFieldTheme>
  );
};

TextField.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  InputProps: PropTypes.object
};
