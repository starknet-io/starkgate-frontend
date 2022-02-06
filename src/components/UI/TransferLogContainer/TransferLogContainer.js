import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {ReactComponent as CollapseIcon} from '../../../assets/svg/icons/collapse.svg';
import {toClasses} from '../../../utils';
import styles from './TransferLogContainer.module.scss';
import {
  EMPTY_MSG_TXT,
  OVERVIEW_TXT,
  TITLE_TXT,
  VIEW_MORE_TXT
} from './TransferLogContainer.strings';

export const TransferLogContainer = ({transferIndex, children}) => {
  const [showChildren, setShowChildren] = useState(transferIndex > 1);

  useEffect(() => {
    setShowChildren(transferIndex > -1);
  }, [transferIndex]);

  const toggleShowChildren = () => {
    setShowChildren(!showChildren);
  };

  const renderChildren = () => {
    if (!children) {
      return <div className={styles.empty}>{EMPTY_MSG_TXT}</div>;
    } else if (!showChildren) {
      return (
        <div className={styles.viewMore}>
          {Array.isArray(children) ? children.length : 1} {OVERVIEW_TXT}{' '}
          <span onClick={toggleShowChildren}>{VIEW_MORE_TXT}</span>
        </div>
      );
    } else {
      return children;
    }
  };

  return (
    <div className={styles.transferLogContainer}>
      <div className={toClasses(styles.title, showChildren && styles.showChildren)}>
        {TITLE_TXT}
        {children && (
          <div>
            <CollapseIcon onClick={toggleShowChildren} />
          </div>
        )}
      </div>
      {renderChildren()}
    </div>
  );
};

TransferLogContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  transferIndex: PropTypes.number
};
