import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as CloseIcon} from '../../../../assets/svg/icons/close.svg';
import {toClasses} from '../../../../utils';
import {ModalType} from '../Modal/Modal.constants';
import styles from './ModalHeader.module.scss';

export const ModalHeader = ({type = ModalType.INFO, isClosable, onClose, children}) => (
  <div className={toClasses(styles.modalHeader, styles[type])}>
    {children}
    {isClosable && <CloseIcon onClick={onClose} />}
  </div>
);

ModalHeader.propTypes = {
  type: PropTypes.string,
  isClosable: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
