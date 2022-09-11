import PropTypes from 'prop-types';
import React from 'react';

import styles from './ModalIconHeader.module.scss';

const ModalIconHeader = ({title, icon: Icon}) => {
  return (
    <div className={styles.container}>
      <Icon />
      <div className={styles.modalIconHeader}>{title}</div>
    </div>
  );
};

ModalIconHeader.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object
};

export default ModalIconHeader;
