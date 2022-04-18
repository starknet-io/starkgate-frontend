import PropTypes from 'prop-types';
import React from 'react';

import {ModalType} from '../../../../enums';
import utils from '../../../../utils';
import styles from './ModalHeader.module.scss';

export const ModalHeader = ({type = ModalType.INFO, children}) => {
  return <div className={utils.object.toClasses(styles.modalHeader, styles[type])}>{children}</div>;
};

ModalHeader.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
