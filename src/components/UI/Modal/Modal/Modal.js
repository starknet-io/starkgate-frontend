import {ModalSize, ModalType} from '@starkware-commons-js/enums';
import PropTypes from 'prop-types';
import React from 'react';
import {createPortal} from 'react-dom';

import {toClasses} from '../../../../utils';
import styles from './Modal.module.scss';

export const Modal = ({show, type = ModalType.INFO, size = ModalSize.MEDIUM, children}) => {
  const {width} = size;

  return show
    ? createPortal(
        <div className={toClasses(styles.modal, styles[type])}>
          <div
            className={toClasses(styles.container, styles[type])}
            style={{width, maxWidth: width}}
          >
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
