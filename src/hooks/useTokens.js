import {getStarknet} from '@argent/get-starknet';
import {useEffect, useState} from 'react';
import {Contract, uint256} from 'starknet';

import {useTransferData} from '../components/Features/Transfer/Transfer.hooks';
import {useWallets} from '../components/Features/Wallet/Wallet.hooks';
import {createERC20Contract} from '../contracts';
import {abi} from '../contracts/ERC20/ERC20_STARKNET.json';
import {ChainType, NetworkType} from '../enums';
import {web3} from '../web3';

export const useTokens = () => {
  const {action, isEthereum} = useTransferData();
  const {account, chainName} = useWallets();
  const [tokensData, setTokensData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let tokens = [];
      if (isEthereum) {
        tokens = await getL1Tokens();
        readBalances(tokens, getL1TokenBalance);
      } else {
        tokens = await getL2Tokens();
        readBalances(tokens, getL2TokenBalance);
      }
      setTokensData(tokens);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [action]);

  const getL1Tokens = async () => {
    const fileName =
      chainName === ChainType.MAIN.name ? 'ethereum.json' : `ethereum.${chainName}.json`;
    return [NetworkType.ETHEREUM, ...(await import(`../config/tokens/${fileName}`)).default];
  };

  const getL2Tokens = async () => {
    const fileName =
      chainName === ChainType.MAIN.name ? 'starknet.json' : `starknet.${chainName}.json`;
    return [...(await import(`../config/tokens/${fileName}`)).default];
  };

  const getL1TokenBalance = async token => {
    let balance;
    const {symbol, address} = token;
    if (symbol === NetworkType.ETHEREUM.symbol) {
      balance = await web3.eth.getBalance(account);
    } else {
      const contract = createERC20Contract(address);
      balance = await contract.methods.balanceOf(account).call();
    }
    return formatBalance(balance);
  };

  const getL2TokenBalance = async token => {
    const {address} = token;
    const starknet = getStarknet();
    const contract = new Contract(abi, address, starknet.provider);
    const response = await contract.call('balance_of', {account});
    const {balance} = response;
    const balanceAsBN = uint256.uint256ToBN(balance);
    return balanceAsBN.toNumber();
  };

  const formatBalance = balance => Number(web3.utils.fromWei(balance));

  const readBalances = (tokens, getBalanceHandler) => {
    const promises = [];
    tokens.forEach(token => promises.push(getBalanceHandler(token)));
    waitForBalance(tokens, promises);
  };

  const waitForBalance = (tokens, promises) => {
    Promise.all(promises).then(balances => {
      const tokensWithBalance = [];
      balances.forEach((balance, index) => {
        const token = {...tokens[index], balance};
        tokensWithBalance.push(token);
      });
      setTokensData(tokensWithBalance);
    });
  };

  return {
    error,
    isLoading,
    tokensData
  };
};
