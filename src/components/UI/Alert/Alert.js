import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as InfoIcon} from '../../../assets/svg/icons/info.svg';
import {ReactComponent as SuccessIcon} from '../../../assets/svg/icons/success.svg';
import {ReactComponent as WarningIcon} from '../../../assets/svg/icons/warning.svg';
import {toClasses} from '../../../utils';
import styles from './Alert.module.scss';

export const AlertType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const Alert = ({title = '', message = '', type = AlertType.INFO}) => {
  const renderIcon = () => {
    switch (type) {
      case AlertType.SUCCESS:
        return <SuccessIcon />;
      case AlertType.WARNING:
        return <WarningIcon />;
      case AlertType.ERROR:
      case AlertType.INFO:
      default:
        return <InfoIcon />;
    }
  };

  return (
    <div className={toClasses(styles.alert, styles[type])}>
      <div className={styles.icon}>{renderIcon()}</div>
      <div className={styles.text}>
        {title && <div className={styles.title} dangerouslySetInnerHTML={{__html: title}}></div>}
        {message && (
          <div className={styles.message} dangerouslySetInnerHTML={{__html: message}}></div>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string
};
