import PropTypes from 'prop-types';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {hash} from 'starknet';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {useDynamicContext, useUserWallets} from '@dynamic-labs/sdk-react-core';
import {useEnvs} from '@hooks';
import {WalletContext, useTransfer} from '@providers';
import {StarknetConnect} from '@starkware-webapps/starknet-connect';
import {parseToFelt} from '@starkware-webapps/web3-utils';

export const WalletProvider = ({children}) => {
  const {isL1} = useTransfer();
  const [wallets, setWallets] = useState([]);
  const [starknetProvider, setStarknetProvider] = useState(null);
  const {SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID} = useEnvs();
  const {setShowAuthFlow, handleUnlinkWallet, setPrimaryWallet, handleLogOut} = useDynamicContext();
  const userWallets = useUserWallets();

  const {
    CHAIN,
    RPC_PROVIDER_BLAST_API_KEY,
    RPC_PROVIDER_CHAINSTACK_NODE_ID,
    RPC_PROVIDER_CHAINSTACK_API_KEY
  } = useEnvs();

  const starknetWallet = useMemo(() => {
    return wallets.find(wallet => wallet.chain === 'STARK');
  }, [wallets]);

  const starknetAccount = useMemo(() => {
    return starknetWallet?.address;
  }, [starknetWallet]);

  const starknetWalletId = useMemo(() => {
    return starknetWallet?.id;
  }, [starknetWallet]);

  const starknetWalletName = useMemo(() => {
    return starknetWallet?.connector.name;
  }, [starknetWallet]);

  const isStarknetWalletConnected = useMemo(() => {
    return !!starknetWallet;
  }, [starknetWallet]);

  const ethereumWallet = useMemo(() => {
    return wallets.find(wallet => wallet.chain === 'EVM');
  }, [wallets]);

  const ethereumWalletId = useMemo(() => {
    return ethereumWallet?.id;
  }, [ethereumWallet]);

  const ethereumWalletName = useMemo(() => {
    return ethereumWallet?.connector.name;
  }, [ethereumWallet]);

  const ethereumAccount = useMemo(() => {
    return ethereumWallet?.address;
  }, [ethereumWallet]);

  const isEthereumWalletConnected = useMemo(() => {
    return !!ethereumWallet;
  }, [ethereumWallet]);

  const isConnected = useMemo(() => {
    return isStarknetWalletConnected && isEthereumWalletConnected;
  }, [isStarknetWalletConnected, isEthereumWalletConnected]);

  const isDisconnected = useMemo(() => {
    return !isStarknetWalletConnected && !isEthereumWalletConnected;
  }, [isStarknetWalletConnected, isEthereumWalletConnected]);

  const walletId = useMemo(() => {
    return isL1 ? ethereumWalletId : starknetWalletId;
  }, [isL1, starknetWalletId, ethereumWalletId]);

  const account = useMemo(() => {
    return isL1 ? ethereumAccount : starknetAccount;
  }, [isL1, starknetAccount, ethereumAccount]);

  const accountHash = useMemo(() => {
    return (
      isConnected &&
      hash.computeHashOnElements([
        parseToFelt(ethereumAccount).toString(),
        parseToFelt(starknetAccount).toString()
      ])
    );
  }, [isConnected, ethereumAccount, starknetAccount]);

  const getStarknetSigner = useCallback(async () => {
    if (isStarknetWalletConnected) {
      return await starknetWallet.connector.getSigner();
    }
  }, [isStarknetWalletConnected, starknetWallet]);

  const getEthereumSigner = useCallback(async () => {
    if (isEthereumWalletConnected) {
      return await ethereumWallet.connector.ethers.getSigner();
    }
  }, [isEthereumWalletConnected, ethereumWallet]);

  const getEthereumProvider = useCallback(async () => {
    if (isEthereumWalletConnected) {
      return await ethereumWallet.connector.ethers.getWeb3Provider();
    }
  }, [isEthereumWalletConnected, ethereumWallet]);

  const getStarknetProvider = useCallback(() => starknetProvider, [starknetProvider]);

  const logout = useCallback(async () => {
    if (wallets.length < 2) {
      await handleLogOut();
    } else {
      await setPrimaryWallet(isL1 ? starknetWalletId : ethereumWalletId);
      await handleUnlinkWallet(isL1 ? ethereumWalletId : starknetWalletId);
    }
  }, [
    isL1,
    wallets,
    ethereumWalletId,
    starknetWalletId,
    handleUnlinkWallet,
    setPrimaryWallet,
    handleLogOut
  ]);

  const login = useCallback(() => {
    setShowAuthFlow(true);
  }, []);

  const walletsByNetwork = useMemo(
    () =>
      userWallets.filter(
        ({chain, network}) =>
          network === (chain === 'EVM' ? SUPPORTED_L1_CHAIN_ID : SUPPORTED_L2_CHAIN_ID)
      ),
    [userWallets]
  );

  useEffect(() => {
    const starknetConnect = StarknetConnect.create({
      network: CHAIN,
      providers: [
        {
          name: StarknetConnect.Provider.BLAST,
          apiKey: RPC_PROVIDER_BLAST_API_KEY
        },
        {
          name: StarknetConnect.Provider.CHAINSTACK,
          nodeId: RPC_PROVIDER_CHAINSTACK_NODE_ID,
          apiKey: RPC_PROVIDER_CHAINSTACK_API_KEY
        }
      ]
    });

    const provider = starknetConnect.getProvider();
    setStarknetProvider(provider);
  }, []);

  useDeepCompareEffect(() => {
    // update wallets only for deep changes
    setWallets(prevWallets => {
      if (prevWallets.length < 2) {
        return walletsByNetwork;
      } else {
        // if there are two wallets, check if they are the same
        const prevAddresses = prevWallets.map(wallet => wallet.address);
        const newAddresses = walletsByNetwork.map(wallet => wallet.address);
        const areEqual = prevAddresses.every(element => !!newAddresses.includes(element));
        return areEqual ? prevWallets : walletsByNetwork;
      }
    });
  }, [userWallets]);

  useEffect(() => {
    if (isConnected) {
      // set primary wallet in accordance with the current chain
      setPrimaryWallet(isL1 ? ethereumWalletId : starknetWalletId);
    }
  }, [isL1]);

  return (
    <WalletContext.Provider
      value={{
        logout,
        login,
        account,
        accountHash,
        walletId,
        isConnected,
        isDisconnected,
        isStarknetWalletConnected,
        isEthereumWalletConnected,
        ethereumWalletId,
        ethereumWalletName,
        ethereumAccount,
        starknetWalletId,
        starknetWalletName,
        starknetAccount,
        ethereumWallet,
        starknetWallet,
        getStarknetSigner,
        getEthereumSigner,
        getEthereumProvider,
        getStarknetProvider
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

WalletProvider.displayName = 'WalletManagerProvider';

WalletProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isConnecting: PropTypes.bool,
  setConnectingChain: PropTypes.func
};
