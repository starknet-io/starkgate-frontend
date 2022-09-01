import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {useTransferLogContainerTranslation} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {CollapseExpand} from '../CollapseExpand/CollapseExpand';
import styles from './TransferLogContainer.module.scss';

export const TransferLogContainer = ({transferIndex, children, onShowTransfers}) => {
  const {resetMenuProps} = useMenu();
  const {titleTxt, overviewTxt, emptyMsgTxt, viewMoreTxt} = useTransferLogContainerTranslation();
  const [showChildren, setShowChildren] = useState(false);

  const toggleShowChildren = () => {
    const show = !showChildren;
    transferIndex > -1 ? resetMenuProps() : setShowChildren(show);
    show && onShowTransfers();
  };

  const renderChildren = () => {
    if (!children) {
      return <div className={styles.empty}>{emptyMsgTxt}</div>;
    } else if (showChildren || transferIndex > -1) {
      return children;
    }

    return (
      <div className={styles.viewMore}>
        {Array.isArray(children) ? children.length : 1} {overviewTxt}{' '}
        <span onClick={toggleShowChildren}>{viewMoreTxt}</span>
      </div>
    );
  };

  return (
    <div className={styles.transferLogContainer}>
      <div className={toClasses(styles.title, showChildren && styles.showChildren)}>
        {titleTxt}
        <CollapseExpand isCollapsed={showChildren} size={15} onClick={toggleShowChildren} />
      </div>
      {renderChildren()}
    </div>
  );
};

TransferLogContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  transferIndex: PropTypes.number,
  onShowTransfers: PropTypes.func
};
