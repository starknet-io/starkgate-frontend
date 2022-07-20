import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as ForwardIcon} from '../../../assets/svg/icons/forward.svg';
import {ReactComponent as LinkIcon} from '../../../assets/svg/icons/link.svg';
import {toClasses, capitalize} from '../../../utils';
import {DynamicIcon, Loading, LoadingType} from '../index';
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
  isDisabled = false,
  isLoading,
  onClick
}) => (
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
      <div className={styles.icon}>{type === ChoiceItemType.LINK ? <LinkIcon /> : <ForwardIcon />}</div>
    </div>
    {isLoading && <Loading type={LoadingType.LINEAR} />}
    <div className={styles.separator} />
  </>
);

MultiChoiceItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  logoPath: PropTypes.string,
  type: PropTypes.number,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func
};
