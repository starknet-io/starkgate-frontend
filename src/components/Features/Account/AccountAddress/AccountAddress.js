import PropTypes from 'prop-types';
import React, {useRef} from 'react';

import {ReactComponent as CopyIcon} from '../../../../assets/svg/icons/copy.svg';
import {useAnimation} from '../../../../hooks';
import {toClasses} from '../../../../utils';
import {COPIED_ANIMATION_TIMEOUT_INTERVAL} from './AccountAddress.constants';
import styles from './AccountAddress.module.scss';
import {COPIED_MSG_TXT} from './AccountAddress.strings';

export const AccountAddress = ({address}) => {
  const [isAnimate, startAnimation] = useAnimation(COPIED_ANIMATION_TIMEOUT_INTERVAL);
  const ref = useRef();

  const onCopyClick = async () => {
    const cb = navigator.clipboard;
    await cb.writeText(ref.current.innerText);
    startAnimation();
  };

  return (
    <>
      <div ref={ref} className={styles.accountAddress}>
        {address.length <= 42 ? address : `${address.substring(0, 42)}...`}
        <CopyIcon onClick={onCopyClick} />
      </div>
      <div className={toClasses(styles.copiedMsg, isAnimate && styles.copied)}>
        {COPIED_MSG_TXT}
      </div>
    </>
  );
};

AccountAddress.propTypes = {
  address: PropTypes.string
};
