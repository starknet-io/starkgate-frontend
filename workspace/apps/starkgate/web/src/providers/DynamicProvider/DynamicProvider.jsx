import PropTypes from 'prop-types';
import {useCallback, useRef} from 'react';

import {screenAddress} from '@api';
import {EthereumWalletConnectors} from '@dynamic-labs/ethereum';
import {EthersExtension} from '@dynamic-labs/ethers-v5';
import {DynamicContextProvider} from '@dynamic-labs/sdk-react-core';
import {StarknetWalletConnectors} from '@dynamic-labs/starknet';
import {WalletBookContextProvider} from '@dynamic-labs/wallet-book';
import {useEnvs, useLoginTracking, useLoginTranslation} from '@hooks';
import {WalletProvider, useBlockedAddressModal, useErrorModal} from '@providers';
import {promiseHandler} from '@starkware-webapps/utils';
import '@styles/dynamic.theme.scss';
import {TermsDisclaimer} from '@ui';

export const DynamicProvider = ({children}) => {
  const {termsDisclaimer} = useLoginTranslation();
  const {DYNAMIC_ENV_ID, ENABLE_SCREENING} = useEnvs();
  const showBlockedAddressModal = useBlockedAddressModal();
  const [, , trackBlockedAddress] = useLoginTracking();
  const showErrorModal = useErrorModal();
  const cachedScreenedAddresses = useRef({});

  const getIsAddressBlocked = useCallback(
    async address => {
      // Check if we already screened this address.
      const cachedResult = cachedScreenedAddresses.current[address];
      if (typeof cachedResult === 'boolean') {
        return cachedResult;
      }
      return screenAddress(address);
    },
    [cachedScreenedAddresses]
  );

  const onBeforeConnectSuccessConfirmation = useCallback(
    async ({address, chain}) => {
      const [blocked, error] = await promiseHandler(
        chain === 'EVM' && ENABLE_SCREENING ? getIsAddressBlocked(address) : Promise.resolve(false)
      );
      if (error) {
        const {title, message} = error;
        showErrorModal(title, message);
      } else {
        if (blocked) {
          showBlockedAddressModal(address);
          trackBlockedAddress({account: address});
        }
        // Cache the result, so we don't have to screen the same address again.
        cachedScreenedAddresses.current[address] = blocked;
      }
      return Promise.resolve(!(blocked || error));
    },
    [showBlockedAddressModal, trackBlockedAddress, showErrorModal]
  );

  return (
    <WalletBookContextProvider>
      <DynamicContextProvider
        settings={{
          environmentId: DYNAMIC_ENV_ID,
          initialAuthenticationMode: 'connect-only',
          customTermsOfServices: <TermsDisclaimer {...termsDisclaimer} />,
          eventsCallbacks: {onBeforeConnectSuccessConfirmation},
          bridgeChains: [
            {
              chain: 'EVM',
              numberOfWallets: 1
            },
            {
              chain: 'STARK',
              numberOfWallets: 1
            }
          ],
          walletConnectorExtensions: [EthersExtension],
          walletConnectors: [EthereumWalletConnectors, StarknetWalletConnectors]
        }}
      >
        <WalletProvider>{children}</WalletProvider>
      </DynamicContextProvider>
    </WalletBookContextProvider>
  );
};

DynamicProvider.displayName = 'DynamicProvider';

DynamicProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
