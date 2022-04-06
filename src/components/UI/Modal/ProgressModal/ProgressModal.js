import PropTypes from 'prop-types';
import React from 'react';

import {OperationInProgressMessage} from '../ModalMessage';
import {WithLoaderModal} from '../WithLoaderModal/WithLoaderModal';

const ProgressModal = ({message}) => {
  return (
    <WithLoaderModal message={message}>
      <OperationInProgressMessage />
    </WithLoaderModal>
  );
};

ProgressModal.propTypes = {
  message: PropTypes.string
};

export default ProgressModal;
