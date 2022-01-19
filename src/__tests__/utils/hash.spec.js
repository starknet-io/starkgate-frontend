import {ChainType, TransactionHashPrefix} from '../../enums';
import {hashEquals, txHash} from '../../utils';

it('should calc tx hash', () => {
  const from_address = '0xcf98f0a8edc6a730e1ca6b64a2528c6be031cb12';
  const to_address = '1384622289134235426972866085149619554404298343372540338336104355150443775597';
  const selector = '1285101517810983806491589552491143496277809242732141897358598292095611420389';
  const nonce = '55';
  const payload = [
    '17466514784613283928575916580398045172482824287888203092305238190565527099',
    '52145000000000',
    '0'
  ];

  expect(
    txHash(
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

it('should compare hashes', () => {
  expect(hashEquals([1, 2, 3], [1, 2, 3])).toBeTruthy();
  expect(hashEquals([1, 2, 3], [1, 2])).toBeFalsy();
});
