import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../../hooks';
import {toClasses} from '../../../../utils';
import {Button} from '../../Button/Button';
import {ModalType} from '../Modal/Modal';
import styles from './ModalFooter.module.scss';

export const ModalFooter = ({type, onClose, children}) => {
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
      />
    </div>
  );
};

ModalFooter.propTypes = {
  type: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
