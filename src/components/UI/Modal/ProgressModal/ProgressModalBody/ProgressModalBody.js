import PropTypes from 'prop-types';
import React from 'react';

import {ModalText} from '../../ModalText/ModalText';
import styles from './ProgressModalBody.module.scss';

const ProgressModalBody = ({message}) => {
  return (
    <div className={styles.progressModalBody}>
      <ModalText style={{width: '70%'}}>{message}</ModalText>
    </div>
  );
};

ProgressModalBody.propTypes = {
  message: PropTypes.string
};

export default ProgressModalBody;
