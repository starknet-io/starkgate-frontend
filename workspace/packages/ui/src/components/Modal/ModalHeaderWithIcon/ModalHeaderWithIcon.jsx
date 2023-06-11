import PropTypes from 'prop-types';
import React from 'react';

import styles from './ModalHeaderWithIcon.module.scss';

export const ModalHeaderWithIcon = ({title, subtitle, icon: Icon}) => {
  return (
    <div className={styles.container}>
      <Icon />
      <div className={styles.modalHeaderWithIcon}>{title}</div>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  );
};

ModalHeaderWithIcon.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.func
};
