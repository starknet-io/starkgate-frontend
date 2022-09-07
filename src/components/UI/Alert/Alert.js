import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as InfoIcon} from '../../../assets/svg/icons/info.svg';
import {ReactComponent as SuccessIcon} from '../../../assets/svg/icons/success.svg';
import {ReactComponent as WarningIcon} from '../../../assets/svg/icons/warning.svg';
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
  align = AlertAlign.LEFT
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
      </div>
    </div>
  );
};

Alert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
  align: PropTypes.string
};
