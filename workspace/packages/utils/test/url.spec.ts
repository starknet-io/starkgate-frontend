import {buildDynamicURL} from '../src';

describe('buildDynamicURL', () => {
  it('should build dynamic url without dynamicQsValues', () => {
    expect(
      buildDynamicURL('https://starkware.banxa.com/', {
        walletAddress: '0x123456789'
      }).href
    ).toEqual('https://starkware.banxa.com/?walletAddress=0x123456789');
  });

  it('should build dynamic url with dynamicQsValues', () => {
    expect(
      buildDynamicURL(
        'https://starkware.banxa.com/',
        {
          walletAddress: '{{accountL2}}'
        },
        {
          accountL2: '0x123456789'
        }
      ).href
    ).toEqual('https://starkware.banxa.com/?walletAddress=0x123456789');
  });
});
