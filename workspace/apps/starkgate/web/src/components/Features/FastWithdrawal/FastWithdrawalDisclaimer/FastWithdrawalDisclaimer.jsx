import {useMemo} from 'react';

import {ReactComponent as ArrowRight} from '@assets/svg/icons/arrow-right.svg';
import {ReactComponent as InfoIcon} from '@assets/svg/icons/info.svg';
import {useConstants, useTransferTranslation} from '@hooks';
import {useAmount} from '@providers';
import {evaluate} from '@starkware-webapps/utils';
import {Link, LinkType} from '@ui';

import styles from './FastWithdrawalDisclaimer.module.scss';

export const FastWithdrawalDisclaimer = () => {
  const {fastWithdrawalDisclaimerTitle, fastWithdrawalDisclaimerTxt, learnMoreTxt} =
    useTransferTranslation();
  const {MAKER_TELEPORT_LEARN_MORE_URL, TELEPORT_FEE_MULTIPLIER} = useConstants();
  const [amount] = useAmount();
  const feeAmount = useMemo(() => TELEPORT_FEE_MULTIPLIER * amount, [amount]);

  return (
    <div className={styles.fastWithdrawalDisclaimer}>
      <div className={styles.disclaimerIcon}>
        <InfoIcon />
      </div>
      <div className={styles.disclaimerText}>
        <div className={styles.disclaimerTitle}>{fastWithdrawalDisclaimerTitle}</div>
        <div className={styles.disclaimerMessage}>
          {evaluate(fastWithdrawalDisclaimerTxt, {feeAmount})}
        </div>
        <Link
          className={styles.disclaimerLearnMore}
          icon={<ArrowRight />}
          link={MAKER_TELEPORT_LEARN_MORE_URL}
          openInNewTab={true}
          text={learnMoreTxt}
          type={LinkType.URL}
        />
      </div>
    </div>
  );
};
