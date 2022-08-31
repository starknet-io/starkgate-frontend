import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../hooks';
import {toClasses} from '../../../utils';
import {Button} from '../index';
import styles from './MainMenuButton.module.scss';

export const MainMenuButton = ({text, onClick, isDisabled, ...props}) => {
  const {colorOrangeSoda, colorWhite, colorFlame, colorIndigo} = useColors();
  return (
    <Button
      className={toClasses(styles.mainMenuButton)}
      colorBackground={isDisabled ? colorIndigo : colorOrangeSoda}
      colorBackgroundHover={colorFlame}
      colorText={colorWhite}
      isDisabled={isDisabled}
      text={text}
      onClick={onClick}
      {...props}
    />
  );
};

MainMenuButton.propTypes = {
  text: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func
};
