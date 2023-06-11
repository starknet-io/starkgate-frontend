import PropTypes from 'prop-types';
import React, {useRef} from 'react';

import {ReactComponent as CopyIcon} from '@assets/svg/icons/copy.svg';
import {useAccountTranslation} from '@hooks';
import {useAnimation} from '@starkware-webapps/ui';
import {shortenAddress} from '@starkware-webapps/utils';
import {toClasses} from '@starkware-webapps/utils-browser';

import styles from './AccountAddress.module.scss';

const COPIED_ANIMATION_TIMEOUT_INTERVAL = 1000;

export const AccountAddress = ({address, onClick}) => {
  const {copiedMsgTxt} = useAccountTranslation();
  const [isAnimate, startAnimation] = useAnimation(COPIED_ANIMATION_TIMEOUT_INTERVAL);
  const ref = useRef();

  const onCopyClick = async () => {
    const cb = navigator.clipboard;
    await cb.writeText(address);
    startAnimation();
    onClick();
  };

  return (
    <>
      <div ref={ref} className={styles.accountAddress}>
        <div className={styles.address}>{shortenAddress(address, 24, 12)}</div>
        <CopyIcon onClick={onCopyClick} />
      </div>
      <div className={toClasses(styles.copiedMsg, isAnimate && styles.copied)}>{copiedMsgTxt}</div>
    </>
  );
};

AccountAddress.propTypes = {
  address: PropTypes.string,
  onClick: PropTypes.func
};
