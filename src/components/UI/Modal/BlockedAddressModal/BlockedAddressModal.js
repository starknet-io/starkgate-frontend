import React from 'react';

import {Link, LinkType, LinkSize} from '../../';
import {useBlockedAddressModalTranslation, useConstants} from '../../../../hooks';
import styles from './BlockedAddressModal.module.scss';

const BlockedAddressModal = () => {
  const {addressIsBlockedTxt, addressIsBlockedLinkTxt, complianceTxt, complianceEmail} =
    useBlockedAddressModalTranslation();
  const {BLOCKED_ADDRESS_URL} = useConstants();

  return (
    <div className={styles.blockedAddressModal}>
      <div>
        {addressIsBlockedTxt}
        <Link
          openInNewTab
          link={BLOCKED_ADDRESS_URL}
          size={LinkSize.MEDIUM}
          text={addressIsBlockedLinkTxt}
          type={LinkType.ALERT}
        />
      </div>
      <div className={styles.compliance}>
        {complianceTxt}
        <Link link={complianceEmail} size={LinkSize.MEDIUM} type={LinkType.EMAIL} />
      </div>
    </div>
  );
};

export default BlockedAddressModal;
