import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';
import {createPortal} from 'react-dom';

import styles from './Modal.module.scss';

export const ModalSize = {
  SMALL: {
    width: 450,
    height: 200
  },
  MEDIUM: {
    width: 550,
    height: 300
  },
  LARGE: {
    width: 700,
    height: 500
  }
};

export const ModalType = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

export const Modal = ({
  show,
  type = ModalType.INFO,
  size = ModalSize.MEDIUM,
  children,
  containerStyle,
  exitable,
  hideModal
}) => {
  const {width} = size;

  const ignoreClickOnBlurryPart = e => {
    e.stopPropagation();
  };

  const handleClickOnBlurryPart = () => {
    exitable && hideModal();
  };

  return show
    ? createPortal(
        <div className={toClasses(styles.modal, styles[type])} onClick={handleClickOnBlurryPart}>
          <div
            className={toClasses(styles.container, styles[type])}
            style={{width, maxWidth: width, ...containerStyle}}
            onClick={ignoreClickOnBlurryPart}
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
  containerStyle: PropTypes.object,
  exitable: PropTypes.bool,
  hideModal: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
