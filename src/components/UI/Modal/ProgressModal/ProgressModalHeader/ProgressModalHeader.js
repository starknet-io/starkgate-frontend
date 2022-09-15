import PropTypes from 'prop-types';
import React from 'react';

import {Loading, LoadingType, LoadingSize} from '../../../Loading/Loading';
import styles from './ProgressModalHeader.module.scss';

const ProgressModalHeader = ({title}) => {
  return (
    <div className={styles.progressModalHeader}>
      <Loading size={LoadingSize.SMALL} type={LoadingType.CIRCULAR} />
      <div className={styles.title}>{title}</div>
    </div>
  );
};

ProgressModalHeader.propTypes = {
  title: PropTypes.string
};

export default ProgressModalHeader;
