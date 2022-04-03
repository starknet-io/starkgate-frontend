import PropTypes from 'prop-types';
import React from 'react';

import utils from '../../../../utils';
import {ModalType} from '../Modal/Modal.constants';
import {ModalText} from '../ModalText/ModalText';
import styles from './ModalBody.module.scss';

export const ModalBody = ({type = ModalType.INFO, children}) => (
  <div className={utils.object.toClasses(styles.modalBody)}>{children}</div>
);

ModalBody.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
