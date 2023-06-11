import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '@hooks';
import {toClasses} from '@starkware-webapps/utils-browser';
import {Button, ModalType} from '@ui';

import styles from './ModalFooter.module.scss';

export const ModalFooter = ({type, onClose, buttonProps, children}) => {
  const {colorJasper, colorIndigo, colorWhite} = useColors();
  const color = type === ModalType.ERROR ? colorJasper : colorIndigo;

  return (
    <div className={toClasses(styles.modalFooter, styles[type])}>
      {children}
      <Button
        colorBackground={color}
        colorBorder={color}
        colorText={colorWhite}
        height={40}
        text="close"
        width={'100%'}
        onClick={onClose}
        {...buttonProps}
      />
    </div>
  );
};

ModalFooter.propTypes = {
  type: PropTypes.string,
  buttonProps: PropTypes.object,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
