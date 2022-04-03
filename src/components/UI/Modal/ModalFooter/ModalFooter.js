import React from 'react';

import {useColors} from '../../../../hooks';
import {toClasses} from '../../../../utils/object';
import {Button} from '../../Button/Button';
import {ModalType} from '../Modal/Modal.constants';
import styles from './ModalFooter.module.scss';

export const ModalFooter = ({type, onClose}) => {
  const {colorError, colorAlpha3, colorWhite} = useColors();
  const color = type === ModalType.ERROR ? colorError : colorAlpha3;
  return (
    <div className={toClasses(styles.modalFooter, styles[type])}>
      <Button
        colorBackground={color}
        colorBorder={color}
        colorText={colorWhite}
        text="close"
        height={40}
        onClick={onClose}
      />
    </div>
  );
};
