import PropTypes from 'prop-types';
import React from 'react';

export const Keyframes = props => {
  const toCss = cssObject =>
    typeof cssObject === 'string'
      ? cssObject
      : Object.keys(cssObject).reduce((accumulator, key) => {
          const cssKey = key.replace(/[A-Z]/g, v => `-${v.toLowerCase()}`);
          const cssValue = cssObject[key].toString().replace("'", '');
          return `${accumulator}${cssKey}:${cssValue};`;
        }, '');

  return (
    <style>
      {`@keyframes ${props.name} {
        ${Object.keys(props)
          .map(key => {
            return ['from', 'to'].includes(key)
              ? `${key} { ${toCss(props[key])} }`
              : /^_[0-9]+$/.test(key)
              ? `${key.replace('_', '')}% { ${toCss(props[key])} }`
              : '';
          })
          .join(' ')}
      }`}
    </style>
  );
};

Keyframes.propTypes = {
  name: PropTypes.string
};
