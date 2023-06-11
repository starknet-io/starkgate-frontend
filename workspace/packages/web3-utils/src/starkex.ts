import cryptoUtils from '@starkware-industries/starkware-crypto-utils';

export const deriveKeyPairFromEthSignature = (signature: string) => {
  const privateKey = cryptoUtils.keyDerivation.getPrivateKeyFromEthSignature(signature);
  return cryptoUtils.ec.keyFromPrivate(privateKey, 'hex');
};

export const signMessage = (msg: string, keyPair: any) => {
  return cryptoUtils.sign(keyPair, msg);
};
