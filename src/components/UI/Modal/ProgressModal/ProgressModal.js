import PropTypes from 'prop-types';
import React from 'react';

import {useProgressModalTranslation} from '../../../../hooks';
import {Alert, AlertType} from '../../Alert/Alert';
import {Loading, LoadingType} from '../../Loading/Loading';
import {ModalText} from '../ModalText/ModalText';
import styles from './ProgressModal.module.scss';

const ProgressModal = ({message}) => {
  const {alertTxt} = useProgressModalTranslation();

  return (
    <div className={styles.progressModal}>
      <Loading type={LoadingType.LINEAR} />
      <ModalText>{message}</ModalText>
      <Alert title={alertTxt} type={AlertType.WARNING} />
    </div>
  );
};

ProgressModal.propTypes = {
  message: PropTypes.string
};

export default ProgressModal;
