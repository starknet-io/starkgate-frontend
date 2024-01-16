import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '@hooks';
import {Checkbox} from '@starkware-webapps/ui';
import {toClasses} from '@starkware-webapps/utils-browser';
import {Link, LinkType} from '@ui';

import styles from './CheckboxWithText.module.scss';

export const CheckboxWithText = ({checked, disabled, message, linkTxt, linkUrl, onChange}) => {
  const {colorOrangeSoda} = useColors();

  return (
    <div className={styles.checkboxWithText}>
      <div className={disabled ? styles.disabled : ''} style={{margin: '0 8px 0 0'}}>
        <Checkbox
          backgroundColor={colorOrangeSoda}
          checked={checked}
          height={'16px'}
          width={'16px'}
          onChange={onChange}
        />
      </div>
      <div className={toClasses(styles.message, disabled && styles.disabled)}>{message} </div>
      <Link
        className={toClasses(styles.message, styles.readMore)}
        link={linkUrl}
        openInNewTab={true}
        text={linkTxt}
        type={LinkType.URL}
      />
    </div>
  );
};

CheckboxWithText.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  message: PropTypes.string,
  linkTxt: PropTypes.string,
  linkUrl: PropTypes.string,
  onChange: PropTypes.func
};
