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
    <div className={toClasses(styles.checkboxWithText, disabled && styles.disabled)}>
      <div style={{margin: '0 8px 0 0'}}>
        <Checkbox
          backgroundColor={colorOrangeSoda}
          checked={checked}
          height={'16px'}
          width={'16px'}
          onChange={onChange}
        />
      </div>
      <div className={styles.message}>
        {message}{' '}
        <Link
          className={toClasses(styles.message, styles.readMore)}
          link={linkUrl}
          openInNewTab={true}
          text={linkTxt}
          type={LinkType.URL}
        />
      </div>
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
