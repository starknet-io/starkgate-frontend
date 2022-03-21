import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {toClasses} from '../../../utils';
import {Loading} from '../Loading/Loading';
import {LoadingSize} from '../Loading/Loading.enums';
import styles from './Button.module.scss';

export const Button = ({
  text,
  width,
  height,
  icon,
  iconAlign = 'left',
  colorText,
  colorTextHover,
  colorBackground,
  colorBackgroundHover,
  colorBorder,
  colorBorderHover,
  style,
  isDisabled,
  isLoading,
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
        isLoading && styles.isLoading
      )}
      style={styleObj}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {iconAlign === 'left' && icon}
      {isLoading ? <Loading size={LoadingSize.SMALL} /> : <span>{text}</span>}
      {iconAlign === 'right' && icon}
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
  icon: PropTypes.object,
  iconAlign: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
