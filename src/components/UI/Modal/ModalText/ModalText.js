import styles from './ModalText.module.scss';

export const ModalText = ({children}) => {
  return (
    <div className={styles.modalText}>
      <div className={styles.wrap}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
