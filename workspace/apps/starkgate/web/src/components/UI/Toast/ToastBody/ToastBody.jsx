import PropTypes from 'prop-types';
import React from 'react';

import styles from './ToastBody.module.scss';

export const ToastBody = ({body, style}) => {
  return (
    <div className={styles.toastBody} style={style}>
      {body}
    </div>
  );
};

ToastBody.propTypes = {
  body: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  style: PropTypes.object
};
