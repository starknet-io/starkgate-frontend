import PropTypes from 'prop-types';

import styles from './OneTxWithdrawal.module.scss';

export const OneTxWithdrawal = ({
  gasCost,
  // isloading,
  // isL1,
  // isTokenSupported,
  useOneTxWithdrawal,
  setUseOneTxWithdrawal
}) => {
  return (
    <div className={styles.oneTxWithdrawal}>
      {
        <p className={styles.description}>
          One transaction withdrawal gas cost <b className={styles.description}>{gasCost} ETH</b>{' '}
          <input
            type="checkbox"
            value={useOneTxWithdrawal}
            onClick={() => setUseOneTxWithdrawal(!useOneTxWithdrawal)}
          />
        </p>
      }
    </div>
  );
};

OneTxWithdrawal.propTypes = {
  gasCost: PropTypes.string,
  isloading: PropTypes.bool,
  isL1: PropTypes.bool,
  isTokenSupported: PropTypes.bool,
  useOneTxWithdrawal: PropTypes.bool,
  setUseOneTxWithdrawal: PropTypes.func
};
