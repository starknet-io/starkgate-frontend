import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '@hooks';
import {toClasses} from '@starkware-webapps/utils-browser';
import {Button} from '@ui';

import styles from './MainMenuButton.module.scss';

export const MainMenuButton = ({className, ...props}) => {
  const {colorOrangeSoda, colorWhite, colorFlame, colorIndigo} = useColors();
  return (
    <Button
      className={toClasses(styles.mainMenuButton, className)}
      colorBackground={props.isDisabled ? colorIndigo : colorOrangeSoda}
      colorBackgroundHover={colorFlame}
      colorText={colorWhite}
      {...props}
    />
  );
};

MainMenuButton.propTypes = {
  className: PropTypes.string,
  isDisabled: PropTypes.bool
};
