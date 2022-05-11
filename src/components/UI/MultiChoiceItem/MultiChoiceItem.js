import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as ForwardIcon} from '../../../assets/svg/icons/forward.svg';
import {toClasses, capitalize} from '../../../utils';
import {DynamicIcon} from '../index';
import styles from './MultiChoiceItem.module.scss';

export const MultiChoiceItem = ({name, description, logoPath, isDisabled, onClick}) => (
  <>
    <div
      className={toClasses(styles.multiChoiceItem, isDisabled && styles.isDisabled)}
      onClick={onClick}
    >
      <div className={styles.left}>
        <DynamicIcon path={logoPath} size={41} />
        <div className={styles.text}>
          <div className={styles.title}>{capitalize(name)}</div>
          <div className={styles.description}>{capitalize(description)}</div>
        </div>
      </div>
      <ForwardIcon />
    </div>
    <div className={styles.separator} />
  </>
);

MultiChoiceItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  logoPath: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func
};
