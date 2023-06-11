import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {ReactComponent as CopyIcon} from '@assets/svg/copy.svg';
import {ReactComponent as DisconnectIcon} from '@assets/svg/disconnect.svg';
import {ReactComponent as LinkIcon} from '@assets/svg/link.svg';
import {useTranslation} from '@hooks';
import {mergeDeep, shortenAddress} from '@starkware-webapps/utils';
import {copyToClipboard, openInNewTab, toClasses} from '@starkware-webapps/utils-browser';

import {DynamicIcon} from '../../DynamicIcon/DynamicIcon';
import {TransactionLogContainer, TransactionLogItem} from '../../TransactionLog';
import {WalletMenuItem} from '../WalletMenuItem/WalletMenuItem';
import styles from './WalletMenu.module.scss';

const FADE_IN_OUT_DELAY = 100;
const COPIED_FEEDBACK_DELAY = 1500;

export const WalletMenu = ({
  isOpen,
  account,
  transactions = [],
  logoPath,
  explorerUrl,
  texts = {},
  onDisconnect
}) => {
  const {EXPLORE_TXT, DISCONNECT_TXT, COPY_TXT, COPIED_TXT} = mergeDeep(
    useTranslation('WalletButton.WalletMenu'),
    texts
  );
  const [show, setShow] = useState(false);
  const [copyTooltip, setCopyTooltip] = useState(COPY_TXT);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShow(isOpen), FADE_IN_OUT_DELAY);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen]);

  const items = [
    {
      icon: <CopyIcon />,
      tooltip: copyTooltip,
      disable: false,
      onClick: () => {
        copyToClipboard(account)
          .then(() => {
            setCopyTooltip(COPIED_TXT);
            setTimeout(() => setCopyTooltip(COPY_TXT), COPIED_FEEDBACK_DELAY);
          })
          .catch();
      }
    },
    {
      icon: <LinkIcon />,
      tooltip: EXPLORE_TXT,
      disable: !explorerUrl,
      onClick: () => {
        explorerUrl && openInNewTab(explorerUrl);
      }
    },
    {
      icon: <DisconnectIcon />,
      tooltip: DISCONNECT_TXT,
      disable: !onDisconnect,
      onClick: () => {
        typeof onDisconnect === 'function' && onDisconnect();
      }
    }
  ];

  const renderItems = () => {
    return items.map(({icon, disable, tooltip, onClick}, index) => {
      return (
        <WalletMenuItem
          key={index}
          disable={disable}
          icon={icon}
          tooltip={tooltip}
          onClick={onClick}
        />
      );
    });
  };

  const renderTransactions = () => {
    return transactions.map(transaction => {
      return <TransactionLogItem key={transaction.transactionHash} transaction={transaction} />;
    });
  };

  return (
    <div className={toClasses(styles.walletMenu, show && styles.isOpen)}>
      <div className={styles.items}>
        <div className={styles.left}>
          <DynamicIcon path={logoPath} size={24} />
          <div className={styles.address}>{shortenAddress(account)}</div>
        </div>
        <div className={styles.right}>{renderItems()}</div>
      </div>
      <TransactionLogContainer height={'512px'}>{renderTransactions()}</TransactionLogContainer>
    </div>
  );
};

WalletMenu.propTypes = {
  isOpen: PropTypes.bool,
  account: PropTypes.string,
  transactions: PropTypes.array,
  logoPath: PropTypes.string,
  explorerUrl: PropTypes.string,
  texts: PropTypes.object,
  onDisconnect: PropTypes.func
};
