import {ChainType, TransactionHashPrefix} from '../../../enums';
import utils from '../../../utils';

describe('starknet', () => {
  describe('getTransactionHash', () => {
    it('should calc tx hash', () => {

      /*
      {
    "event": {
        "address": "0xde29d060D45901Fb19ED6C6e959EB22d8626708e",
        "blockHash": "0x9b7af00baa547436cba36a41ed59870090c001c2d42763d18dcb633573171079",
        "blockNumber": 6581699,
        "logIndex": 5,
        "removed": false,
        "transactionHash": "0x2efc566c4f185e539e05782e4e467954a759e4ab183951c84dd22aa563066963",
        "transactionIndex": 3,
        "id": "log_43438c44",
        "returnValues": {
            "0": "0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e",
            "1": "3256441166037631918262930812410838598500200462657642943867372734773841898370",
            "2": "1285101517810983806491589552491143496277809242732141897358598292095611420389",
            "3": [
                "2466233808699993860276959899635844440352648432893721200040352181857144501229",
                "12213000000000",
                "0"
            ],
            "4": "9052",
            "from_address": "0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e",
            "to_address": "3256441166037631918262930812410838598500200462657642943867372734773841898370",
            "selector": "1285101517810983806491589552491143496277809242732141897358598292095611420389",
            "payload": [
                "2466233808699993860276959899635844440352648432893721200040352181857144501229",
                "12213000000000",
                "0"
            ],
            "nonce": "9052"
        },
        "event": "LogMessageToL2",
        "signature": "0x7d3450d4f5138e54dcb21a322312d50846ead7856426fb38778f8ef33aeccc01",
        "raw": {
            "data": "0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000235c00000000000000000000000000000000000000000000000000000000000000030573d6c01f64dd68d20b0d62f98ce19fcf387c8fddedfff4a5cede84490f73ed00000000000000000000000000000000000000000000000000000b1b8f86d2000000000000000000000000000000000000000000000000000000000000000000",
            "topics": [
                "0x7d3450d4f5138e54dcb21a322312d50846ead7856426fb38778f8ef33aeccc01",
                "0x000000000000000000000000c3511006c04ef1d78af4c8e0e74ec18a6e64ff9e",
                "0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82",
                "0x02d757788a8d8d6f21d1cd40bce38a8222d70654214e96ff95d8086e684fbee5"
            ]
        }
    }
}
       */

      const from_address = '0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e';
      const to_address =
        '1384622289134235426972866085149619554404298343372540338336104355150443775597';
      const selector =
        '1285101517810983806491589552491143496277809242732141897358598292095611420389';
      const nonce = '55';
      const payload = [
        '17466514784613283928575916580398045172482824287888203092305238190565527099',
        '52145000000000',
        '0'
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
