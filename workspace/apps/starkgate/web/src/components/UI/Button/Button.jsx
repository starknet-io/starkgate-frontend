import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {toClasses} from '@starkware-webapps/utils-browser';
import {Loading, LoadingSize} from '@ui';

import styles from './Button.module.scss';

export const Button = ({
  text,
  width,
  height,
  iconLeft,
  iconRight,
  colorText,
  colorTextHover,
  colorBackground,
  colorBackgroundHover,
  colorBorder,
  colorBorderHover,
  style,
  isDisabled,
  isLoading,
  className,
  onClick
}) => {
  const [isHover, setIsHover] = useState(false);
  const styleObj = {
    width,
    height,
    color: isHover ? colorTextHover || colorText : colorText,
    backgroundColor: isHover ? colorBackgroundHover || colorBackground : colorBackground,
    borderColor: isHover ? colorBorderHover || colorBorder : colorBorder,
    ...style
  };

  return (
    <button
      className={toClasses(
        styles.button,
        isDisabled && styles.isDisabled,
        isLoading && styles.isLoading,
        text && styles.hasText,
        className
      )}
      style={styleObj}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {iconLeft}
      {isLoading ? <Loading size={LoadingSize.SMALL} /> : text}
      {iconRight && <div className={toClasses(styles.icon, styles.right)}>{iconRight}</div>}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colorText: PropTypes.string,
  colorTextHover: PropTypes.string,
  colorBackground: PropTypes.string,
  colorBackgroundHover: PropTypes.string,
  colorBorder: PropTypes.string,
  colorBorderHover: PropTypes.string,
  style: PropTypes.object,
  iconLeft: PropTypes.object,
  iconRight: PropTypes.object,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
