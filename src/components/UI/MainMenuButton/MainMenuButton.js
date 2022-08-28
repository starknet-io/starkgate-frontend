import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../hooks';
import {toClasses} from '../../../utils';
import {Button} from '../index';
import styles from './MainMenuButton.module.scss';

export const MainMenuButton = ({text, onClick, ...props}) => {
  const {colorOrangeSoda, colorWhite} = useColors();

  return (
    <Button
      className={toClasses(styles.mainMenuButton)}
      colorBackground={colorOrangeSoda}
      colorBorder={colorOrangeSoda}
      colorText={colorWhite}
      height={50}
      text={text}
      onClick={onClick}
      {...props}
    />
  );
};

MainMenuButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};
