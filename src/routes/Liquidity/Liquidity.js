import React from 'react';

import {ChoiceItemType, MultiChoiceMenu} from '../../components/UI';
import {useLiquidityTranslation} from '../../hooks';
import {useL2Wallet} from '../../providers/WalletsProvider';
import {openInNewTab, toClasses, buildDynamicURL} from '../../utils';
import styles from './Liquidity.module.scss';

export const Liquidity = () => {
  const {account: accountL2} = useL2Wallet();
  const {titleTxt, descriptionTxt} = useLiquidityTranslation();

  const dynamicQsValues = {
    accountL2
  };

  return (
    <div className={toClasses(styles.liquidity, 'center')}>
      <MultiChoiceMenu description={descriptionTxt} title={titleTxt} />
    </div>
  );
};
