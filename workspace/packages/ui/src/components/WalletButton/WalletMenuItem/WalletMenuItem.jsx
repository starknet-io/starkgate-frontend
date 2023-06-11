import {PropTypes} from 'prop-types';
import React, {useState} from 'react';

import {useColors} from '@hooks';
import {toClasses} from '@starkware-webapps/utils-browser';

import {Tooltip} from '../../Tooltip/Tooltip';
import styles from './WalletMenuItem.module.scss';

export const WalletMenuItem = ({icon, disable, tooltip, onClick}) => {
  const {colorVeryLightAzure, colorWhite} = useColors();
  const [color, setColor] = useState(colorWhite);

  return (
    <Tooltip color={color} title={tooltip}>
      <div
        className={toClasses(styles.walletMenuItem, disable && styles.disable)}
        onClick={onClick}
        onMouseEnter={() => setColor(colorVeryLightAzure)}
        onMouseLeave={() => setColor(colorWhite)}
      >
        {icon}
      </div>
    </Tooltip>
  );
};

WalletMenuItem.propTypes = {
  icon: PropTypes.object,
  disable: PropTypes.bool,
  color: PropTypes.object,
  tooltip: PropTypes.string,
  onClick: PropTypes.func
};
