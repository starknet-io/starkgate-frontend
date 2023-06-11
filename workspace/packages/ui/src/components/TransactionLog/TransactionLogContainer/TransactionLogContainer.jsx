import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {useTranslation} from '@hooks';

import {CollapseExpand} from '../../CollapseExpand/CollapseExpand';
import styles from './TransactionLogContainer.module.scss';

export const TransactionLogContainer = ({children, height, onExpand = () => ({})}) => {
  const {
    TITLE_TXT,
    SINGLE_OVERVIEW_TXT,
    OVERVIEW_TXT,
    EMPTY_MSG_TXT,
    VIEW_MORE_TXT,
    VIEW_LESS_TXT
  } = useTranslation('TransactionLogContainer');

  const [showChildren, setShowChildren] = useState(false);

  const toggleShowChildren = () => {
    const show = !showChildren;
    setShowChildren(show);
    show && onExpand();
  };

  const renderChildren = () => {
    if (!children || (Array.isArray(children) && !children.length)) {
      return <div className={styles.empty}>{EMPTY_MSG_TXT}</div>;
    }

    return (
      <div className={styles.viewMore}>
        {showChildren && (
          <div className={styles.logsContainer} style={{maxHeight: height}}>
            <div className={styles.overflow}>{children}</div>
          </div>
        )}
        {children.length > 1 ? `${children.length} ${OVERVIEW_TXT}` : `1 ${SINGLE_OVERVIEW_TXT}`}{' '}
        <span onClick={toggleShowChildren}>{showChildren ? VIEW_LESS_TXT : VIEW_MORE_TXT}</span>
      </div>
    );
  };

  return (
    <div className={styles.transactionLogContainer}>
      <div className={styles.title}>
        {TITLE_TXT}
        {children.length > 0 && (
          <CollapseExpand isCollapsed={showChildren} onClick={toggleShowChildren} />
        )}
      </div>
      {renderChildren()}
    </div>
  );
};

TransactionLogContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  height: PropTypes.string,
  onExpand: PropTypes.func
};
