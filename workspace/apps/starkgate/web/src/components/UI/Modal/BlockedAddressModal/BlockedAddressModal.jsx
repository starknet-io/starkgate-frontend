import {useBlockedAddressModalTranslation} from '@hooks';

import styles from './BlockedAddressModal.module.scss';

const BlockedAddressModal = () => {
  const {descriptionTxt} = useBlockedAddressModalTranslation();

  return (
    <div className={styles.blockedAddressModal}>
      <div>{descriptionTxt}</div>
    </div>
  );
};

export default BlockedAddressModal;
