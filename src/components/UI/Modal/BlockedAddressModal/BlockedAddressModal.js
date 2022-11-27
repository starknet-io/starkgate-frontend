import React from 'react';

import {Link, LinkType} from '../../';
import {useBlockedAddressModalTranslation, useConstants} from '../../../../hooks';
import styles from './BlockedAddressModal.module.scss';

const BlockedAddressModal = () => {
  const {STARKGATE_COMPLIANCE_MAIL_ADDRESS} = useConstants();
  const {descriptionTxt, complianceTxt} = useBlockedAddressModalTranslation();

  return (
    <div className={styles.blockedAddressModal}>
      <div>{descriptionTxt}</div>
      <div className={styles.compliance}>
        {complianceTxt}{' '}
        <Link
          className={styles.complianceEmailLink}
          link={STARKGATE_COMPLIANCE_MAIL_ADDRESS}
          type={LinkType.EMAIL}
        />
      </div>
    </div>
  );
};

export default BlockedAddressModal;
