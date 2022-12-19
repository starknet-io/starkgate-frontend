import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as ForwardIcon} from '../../../assets/svg/icons/forward.svg';
import {ReactComponent as LinkIcon} from '../../../assets/svg/icons/link.svg';
import {CircleLogoSize, DynamicIcon, Loading, LoadingType} from '../index';
import styles from './MultiChoiceItem.module.scss';

export const ChoiceItemType = {
  BUTTON: 0,
  LINK: 1
};

export const MultiChoiceItem = ({
  name,
  description,
  logoPath,
  type = ChoiceItemType.BUTTON,
  size = CircleLogoSize.MEDIUM,
  isDisabled = false,
  isLoading,
  error,
  onClick
}) => (
  <div
    className={toClasses(
      styles.multiChoiceItem,
      isDisabled && styles.isDisabled,
      error && styles.error
    )}
    onClick={onClick}
  >
    <div className={styles.container}>
      <div className={styles.left}>
        <DynamicIcon path={logoPath} size={size} />
        <div className={styles.text}>
          <div className={styles.title}>{name}</div>
          {description && <div className={styles.description}>{description}</div>}
        </div>
      </div>
      <div className={styles.icon}>
        {type === ChoiceItemType.LINK ? <LinkIcon /> : <ForwardIcon />}
      </div>
    </div>
    {isLoading && <Loading type={LoadingType.LINEAR} />}
  </div>
);

MultiChoiceItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  logoPath: PropTypes.string,
  type: PropTypes.number,
  size: PropTypes.number,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  onClick: PropTypes.func
};
