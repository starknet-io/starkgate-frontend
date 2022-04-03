import PropTypes from 'prop-types';
import React from 'react';
import {createPortal} from 'react-dom';

import utils from '../../../../utils';
import {ModalSize, ModalType} from './Modal.constants';
import styles from './Modal.module.scss';

export const Modal = ({show, type = ModalType.INFO, size = ModalSize.MEDIUM, children}) => {
  const {width} = size;
  return show
    ? createPortal(
        <div className={utils.object.toClasses(styles.modal, styles[type])}>
          <div className={utils.object.toClasses(styles.container, styles[type])} style={{width}}>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

Modal.propTypes = {
  show: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
