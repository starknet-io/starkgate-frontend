import {ChainType, TransactionHashPrefix} from '@starkware-industries/commons-js-enums';
import {getTransactionHash} from '@starkware-industries/commons-js-utils';

describe('starknet blockchain utils', () => {
  describe('getTransactionHash', () => {
    it('should calc tx hash from message params', () => {
      const from_address = '0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e';
      const to_address =
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
          from_address,
          to_address,
          selector,
          payload,
          ChainType.L2.GOERLI,
          nonce
        )
      ).toEqual('0x6660a4a84d5c6665be0e97b863433afe3ce7ea6521f5f90e0693b3b772cda55');
    });
  });
});
