import utils from '../utils';

export const deposit = async ({recipient, amount, decimals, contract, options, emitter}) => {
  try {
    return utils.blockchain.ethereum.sendTransaction(
      contract,
      'deposit',
      [utils.parser.parseToDecimals(amount, decimals), recipient],
      options,
      emitter
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const depositEth = async ({recipient, amount, contract, options, emitter}) => {
  try {
    return utils.blockchain.ethereum.sendTransaction(
      contract,
      'deposit',
      [recipient],
      {
        ...options,
        value: utils.parser.parseToDecimals(amount)
      },
      emitter
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const withdraw = async ({recipient, amount, decimals, contract, emitter}) => {
  try {
    return utils.blockchain.ethereum.sendTransaction(
      contract,
      'withdraw',
      [utils.parser.parseToDecimals(amount, decimals), recipient],
      {
        from: recipient
      },
      emitter
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const maxDeposit = async ({decimals, contract}) => {
  try {
    const maxDeposit = await utils.blockchain.ethereum.callContract(contract, 'maxDeposit');
    return utils.parser.parseFromDecimals(maxDeposit, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const initiateWithdraw = async ({recipient, amount, decimals, contract}) => {
  try {
    return utils.blockchain.starknet.sendTransaction(contract, 'initiate_withdraw', {
      l1Recipient: utils.parser.parseToFelt(recipient),
      amount: utils.parser.parseToUint256(amount, decimals)
    });
  } catch (ex) {
    return Promise.reject(ex);
  }
};
