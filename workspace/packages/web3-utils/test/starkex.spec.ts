import {deriveKeyPairFromEthSignature, signMessage} from '../src';

describe('starkex blockchain utils', () => {
  describe('deriveKeyPairFromEthSignature', () => {
    it('should derive keyPair correctly', async () => {
      const ethSignature =
        '0x7f1e3d9ea5e260712c873f94da61a8cbf3c490b0fcc141834f84447402877772558a8864c644d2fb3b0b9265c078bc80dc83b6aec4f339f324ea42a153dbc1881c';
      const keyPair = deriveKeyPairFromEthSignature(ethSignature);

      expect(keyPair.getPublic(true, 'hex')).to.equal(
        '03021ec390f549c2f45836acd362accc4eba2614a82f6d36ff37e679b11101375b'
      );

      expect(keyPair.getPrivate('hex')).to.equal(
        '01713f68ab3f41a6578307aea5e4a238218fb10a0c3b9ef505336941ce1047fa'
      );
    });
  });

  describe('signMessage', () => {
    it('should sign message correctly', async () => {
      const ethSignature =
        '0x7f1e3d9ea5e260712c873f94da61a8cbf3c490b0fcc141834f84447402877772558a8864c644d2fb3b0b9265c078bc80dc83b6aec4f339f324ea42a153dbc1881c';

      const message = '04994bc06b5a55d2d54e1ad03da7f9a1505e127202b1e02bc5f37860410bb7cc';

      const keyPair = deriveKeyPairFromEthSignature(ethSignature);
      const signature = signMessage(message, keyPair);

      expect(signature.r.toString()).to.equal(
        '25760890734870459802736970925711781794189288047138633789802277459745992401'
      );
      expect(signature.s.toString()).to.equal(
        '3145692183193830377037418178633956835854977538820321769546767662340994803738'
      );
    });
  });
});
