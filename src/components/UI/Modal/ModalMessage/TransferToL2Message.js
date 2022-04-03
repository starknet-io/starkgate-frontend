import {toClasses} from '../../../../utils/object';
import styles from './ModalMessage.module.scss';

export const TransferToL2Message = () => {
  return (
    <div className={toClasses(styles.modalMessage, styles.transferMessage)}>
      Note: This is an Alpha version. Completing a Ethereum → StarkNet transfer may take{' '}
      <b>up to several hours</b> depending on the congestion. It may take a while for your wallet
      balance to update.
    </div>
  );
};
