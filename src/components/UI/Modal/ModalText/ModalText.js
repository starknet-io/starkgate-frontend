import PropTypes from 'prop-types';

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

ModalText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object])
};
