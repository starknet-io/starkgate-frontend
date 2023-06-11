import PropTypes from 'prop-types';
import React from 'react';

import {useSourceTranslation} from '@hooks';
import {useIsL1, useIsL2, useLogin} from '@providers';
import {Badge, NetworkTitle, SourceSelect, TokenBalance} from '@ui';

import styles from './NetworkMenu.module.scss';

export const NetworkMenu = ({networkName, tokenData, isTarget, onRefreshClick, children}) => {
  const {fromTxt, toTxt} = useSourceTranslation();
  const {isLoggedIn} = useLogin();
  const [isL1] = useIsL1();
  const [isL2] = useIsL2();

  return (
    <>
      <Badge text={isTarget ? toTxt : fromTxt} />
      <div className={styles.networkContainer}>
        {(isL1 && !isTarget) || (isL2 && isTarget) ? (
          <SourceSelect />
        ) : (
          <NetworkTitle networkName={networkName} />
        )}
        {isLoggedIn && <TokenBalance tokenData={tokenData} onRefreshClick={onRefreshClick} />}
      </div>
      <div className={styles.transferContainer}>{children}</div>
    </>
  );
};

NetworkMenu.propTypes = {
  networkName: PropTypes.string,
  tokenData: PropTypes.object,
  isTarget: PropTypes.bool,
  onRefreshClick: PropTypes.func,
  children: PropTypes.any
};
