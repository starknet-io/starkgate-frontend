import PropTypes from 'prop-types';

import styles from './ModalText.module.scss';

export const ModalText = ({style, children}) => {
  return (
    <div className={styles.modalText} style={style}>
      <div className={styles.wrap}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

ModalText.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object])
};
