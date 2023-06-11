import {SequencerProvider} from 'starknet';

import {ChainTypeL2, TransactionHashPrefix, TransactionStatus} from '@starkware-webapps/enums/src';

import {getTransactionHash, waitForTransaction} from '../src';

describe('starknet blockchain utils', () => {
  describe('getTransactionHash', () => {
    it('should calc tx hash from message params', () => {
      const fromAddress = '0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e';
      const toAddress =
        '3256441166037631918262930812410838598500200462657642943867372734773841898370';
      const selector =
        '1285101517810983806491589552491143496277809242732141897358598292095611420389';
      const nonce = '9052';
      const payload = [
        '2466233808699993860276959899635844440352648432893721200040352181857144501229',
        '12213000000000',
        '0'
      ];

      expect(
        getTransactionHash(
          TransactionHashPrefix.L1_HANDLER,
          fromAddress,
          toAddress,
          selector,
          payload,
          ChainTypeL2.GOERLI,
          nonce
        )
      ).toEqual('0x6660a4a84d5c6665be0e97b863433afe3ce7ea6521f5f90e0693b3b772cda55');
    });
  });

  describe('waitForTransaction', () => {
    it('should return ACCEPTED_ON_L1 status', async () => {
      const transactionHash = '0x30c2666f0f105a0baaea27ed319610356360735457aaaac157747ab192c1d6b';
      const status = await waitForTransaction(
        new SequencerProvider(),
        transactionHash,
        TransactionStatus.ACCEPTED_ON_L1,
        0
      );

      expect(status).toEqual(TransactionStatus.ACCEPTED_ON_L1);
    });
  });
});
