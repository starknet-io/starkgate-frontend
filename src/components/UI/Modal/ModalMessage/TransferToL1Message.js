import {toClasses} from '../../../../utils/object';
import styles from './ModalMessage.module.scss';

export const TransferToL1Message = () => {
  return (
    <div className={toClasses(styles.modalMessage, styles.transferMessage)}>
      <center>
        The StarkNet → Ethereum transfer divided into two stages (
        <a href="https://starknet.io/documentation/starkgate-token-bridge/">Docs</a>):
      </center>
      <ul>
        <li>A waiting period of several hours is expected between the stages.</li>
        <li>
          At the end of the first step, you will be required to sign in order to complete the
          transfer.
        </li>
      </ul>
    </div>
  );
};
