import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '@starkware-webapps/utils-browser';

import {ModalType} from '../Modal/Modal';
import styles from './ModalBody.module.scss';

export const ModalBody = ({type = ModalType.INFO, children}) => (
  <div className={toClasses(styles.modalBody, styles[type])}>{children}</div>
);

ModalBody.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
