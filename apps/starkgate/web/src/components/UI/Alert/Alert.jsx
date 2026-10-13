import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as InfoIcon} from '@assets/svg/icons/info.svg';
import {ReactComponent as SuccessIcon} from '@assets/svg/icons/success.svg';
import {ReactComponent as WarningIcon} from '@assets/svg/icons/warning.svg';
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
          {/*
            Render title/message as escaped text instead of raw HTML.
            These values can originate from on-chain token metadata (name/symbol,
            which anyone can set when deploying a token through the bridge) or from
            revert-reason strings surfaced as error.message. Using dangerouslySetInnerHTML
            here would allow persistent HTML/script injection (stored XSS / defacement),
            so we let React escape the content. No legitimate caller passes HTML markup.
          */}
          {title && <div className={styles.title}>{title}</div>}
          {message && <div className={styles.message}>{message}</div>}
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
