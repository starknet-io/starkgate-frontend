import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {ReactComponent as WarningIcon} from '../../../../assets/svg/icons/warning.svg';
import {toClasses} from '../../../../utils';
import {CollapseExpand} from '../../CollapseExpand/CollapseExpand';
import styles from './ErrorToast.module.scss';

export const ErrorToast = ({title, msg, isCollapsable}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onCollapseExpandClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={toClasses(styles.errorToast, isCollapsed && styles.collapsed)}>
      <div className={styles.leftBorder} />
      <div className={styles.container}>
        <WarningIcon className={styles.warning} />
        <div className={styles.text}>
          <div className={styles.title}>{title}</div>
          {!isCollapsed && <div className={styles.msg}>{msg}</div>}
        </div>
        {isCollapsable && (
          <CollapseExpand isCollapsed={isCollapsed} size={20} onClick={onCollapseExpandClick} />
        )}
      </div>
    </div>
  );
};

ErrorToast.propTypes = {
  title: PropTypes.string,
  msg: PropTypes.string,
  isCollapsable: PropTypes.bool
};
