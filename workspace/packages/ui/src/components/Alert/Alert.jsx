import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as CloseIcon} from '@assets/svg/close.svg';
import {ReactComponent as InfoIcon} from '@assets/svg/info.svg';
import {ReactComponent as SuccessIcon} from '@assets/svg/success.svg';
import {ReactComponent as WarningIcon} from '@assets/svg/warning.svg';
import {toClasses} from '@starkware-webapps/utils-browser';

import styles from './Alert.module.scss';

export const AlertType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const AlertAlign = {
  LEFT: 'alignLeft',
  CENTER: 'alignCenter',
  RIGHT: 'alignRight'
};

export const Alert = ({
  title = '',
  message = '',
  type = AlertType.INFO,
  align = AlertAlign.LEFT,
  closable = false,
  onClose
}) => {
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
      <div className={toClasses(styles.container, styles[align])}>
        <div className={styles.icon}>{renderIcon()}</div>
        <div className={styles.text}>
          {title && <div dangerouslySetInnerHTML={{__html: title}} className={styles.title}></div>}
          {message && (
            <div dangerouslySetInnerHTML={{__html: message}} className={styles.message}></div>
          )}
        </div>
        {closable && (
          <div className={styles.close} onClick={onClose}>
            <CloseIcon />
          </div>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
  align: PropTypes.string,
  closable: PropTypes.bool,
  onClose: PropTypes.func
};
