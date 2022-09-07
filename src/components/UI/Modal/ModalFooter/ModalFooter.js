import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../../hooks';
import {Button} from '../../Button/Button';
import {ModalType} from '../Modal/Modal';
import styles from './ModalFooter.module.scss';

export const ModalFooter = ({type, onClose, children, ...props}) => {
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
        {...props}
      />
    </div>
  );
};

ModalFooter.propTypes = {
  type: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
