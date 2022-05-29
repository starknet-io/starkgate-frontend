import styles from './ModalMessage.module.scss';

export const TransferToL2Message = () => {
  return (
    <div className={styles.modalMessage}>
      Note: This is an Alpha version. Completing a Ethereum → StarkNet transfer may take{' '}
      <b>up to several hours</b> depending on the congestion. It may take a while for your wallet
      balance to update.
    </div>
  );
};
