import {useConstants} from '../../../../hooks';
import {toClasses} from '../../../../utils/object';
import styles from './ModalMessage.module.scss';

export const TransferToL1Message = () => {
  const {STARKGATE_DOCS_URL} = useConstants();

  return (
    <div className={toClasses(styles.modalMessage, styles.transferMessage)}>
      <center>
        The StarkNet → Ethereum transfer divided into two stages (
        <a href={STARKGATE_DOCS_URL} rel="noreferrer" target="_blank">
          Docs
        </a>
        ):
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
