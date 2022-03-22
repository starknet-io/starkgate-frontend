import {ChainType, TransactionHashPrefix} from '../../../enums';
import utils from '../../../utils';

describe('starknet', () => {
  describe('getTransactionHash', () => {
    it('should calc tx hash', () => {
      const from_address = '0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e';
      const to_address =
        '3256441166037631918262930812410838598500200462657642943867372734773841898370';
      const selector =
        '1285101517810983806491589552491143496277809242732141897358598292095611420389';
      const nonce = '9052';
      const payload = [
        "2466233808699993860276959899635844440352648432893721200040352181857144501229",
        "12213000000000",
        "0"
      ];

      expect(
        utils.blockchain.starknet.getTransactionHash(
          TransactionHashPrefix.L1_HANDLER,
          from_address,
          to_address,
          selector,
          payload,
          ChainType.GOERLI.id,
          nonce
        )
      ).toEqual('0x35ab0e4de971ac0736844ef36a05796dc41490c165373923c423f4b995983e8');
    });
  });
});
