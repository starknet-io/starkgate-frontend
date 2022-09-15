import PropTypes from 'prop-types';
import React from 'react';

import styles from './ModalHeaderWithIcon.module.scss';

const ModalHeaderWithIcon = ({title, icon: Icon}) => {
  return (
    <div className={styles.container}>
      <Icon />
      <div className={styles.modalHeaderWithIcon}>{title}</div>
    </div>
  );
};

ModalHeaderWithIcon.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object
};

export default ModalHeaderWithIcon;
