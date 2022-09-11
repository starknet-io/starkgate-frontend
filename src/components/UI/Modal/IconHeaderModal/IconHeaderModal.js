import PropTypes from 'prop-types';
import React from 'react';

import styles from './IconHeaderModal.module.scss';

const IconModalHeader = ({title, icon: Icon}) => {
  return (
    <div className={styles.container}>
      <Icon />
      <div className={styles.iconHeaderModal}>{title}</div>
    </div>
  );
};

IconModalHeader.propTypes = {
  title: PropTypes.string,
  iconPath: PropTypes.string
};

export default IconModalHeader;
