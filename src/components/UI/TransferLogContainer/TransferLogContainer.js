import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {ReactComponent as CollapseIcon} from '../../../assets/svg/icons/collapse.svg';
import {useMenu} from '../../../providers/MenuProvider';
import utils from '../../../utils';
import styles from './TransferLogContainer.module.scss';
import {
  EMPTY_MSG_TXT,
  OVERVIEW_TXT,
  TITLE_TXT,
  VIEW_MORE_TXT
} from './TransferLogContainer.strings';

export const TransferLogContainer = ({transferIndex, children, onShowTransfers}) => {
  const {resetMenuProps} = useMenu();
  const [showChildren, setShowChildren] = useState(false);

  const toggleShowChildren = () => {
    const show = !showChildren;
    transferIndex > -1 ? resetMenuProps() : setShowChildren(show);
    show && onShowTransfers();
  };

  const renderChildren = () => {
    if (!children) {
      return <div className={styles.empty}>{EMPTY_MSG_TXT}</div>;
    } else if (showChildren || transferIndex > -1) {
      return children;
    }

    return (
      <div className={styles.viewMore}>
        {Array.isArray(children) ? children.length : 1} {OVERVIEW_TXT}{' '}
        <span onClick={toggleShowChildren}>{VIEW_MORE_TXT}</span>
      </div>
    );
  };

  return (
    <div className={styles.transferLogContainer}>
      <div className={utils.object.toClasses(styles.title, showChildren && styles.showChildren)}>
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
  transferIndex: PropTypes.number,
  onShowTransfers: PropTypes.func
};
