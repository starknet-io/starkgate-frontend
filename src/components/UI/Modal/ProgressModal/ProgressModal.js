import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../../hooks';
import {LoadingSize} from '../../Loading/Loading.enums';
import {Loading} from '../../index';
import styles from './ProgressModal.module.scss';

const ProgressModal = ({message}) => {
  const {colorBeta} = useColors();

  return (
    <div className={styles.progressModal}>
      <div>{message}</div>
      <div className={styles.loading}>
        <center>
          <Loading color={colorBeta} size={LoadingSize.LARGE} />
        </center>
      </div>
    </div>
  );
};

ProgressModal.propTypes = {
  message: PropTypes.string
};

export default ProgressModal;
