import PropTypes from 'prop-types';
import React from 'react';

import styles from './ModalTitle.module.scss';

export const ModalTitle = ({children}) => <div className={styles.modalTitle}>{children}</div>;

ModalTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string])
};
