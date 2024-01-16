import {expect} from 'chai';
import {Account} from 'starknet';

import {Provider, StarknetConnect, StarknetConnectConfig} from '..';

describe('StarknetConnect', () => {
  it('should create a Starknet Connect with an account and provider', () => {
    const config = {
      network: 'main',
      providers: [
        {
          name: StarknetConnect.Provider.BLAST,
          apiKey: '1'
        },
        {
          name: StarknetConnect.Provider.INFURA,
          apiKey: '2'
        },
        {
          name: StarknetConnect.Provider.CHAINSTACK,
          apiKey: '3',
          nodeId: '1'
        }
      ]
    };

    const connector = StarknetConnect.create(config as StarknetConnectConfig);

    expect(connector).to.be.an.instanceOf(StarknetConnect);
    expect(connector.getProvider()).to.be.an('object');
  });

  it('should create a Starknet Connect without an account and provider', () => {
    const config = {
      network: 'goerli',
      providers: [
        {
          name: StarknetConnect.Provider.BLAST,
          apiKey: 'api-key'
        }
      ]
    };

    const connector = StarknetConnect.create(config as StarknetConnectConfig);

    expect(connector).to.be.an.instanceOf(StarknetConnect);
    expect(connector.getProvider()).to.be.an.instanceOf(Provider);
  });

  it('should create a Starknet Connect with only a provider', () => {
    const connector = StarknetConnect.create({
      network: 'main',
      providers: [
        {
          name: StarknetConnect.Provider.BLAST,
          apiKey: '1'
        },
        {
          name: StarknetConnect.Provider.INFURA,
          apiKey: '2'
        }
      ]
    });

    expect(connector).to.be.an.instanceOf(StarknetConnect);
    expect(connector.getProvider()).to.be.an.instanceOf(Provider);
  });

  it('should create account after create a Starknet Connect', () => {
    const connector = StarknetConnect.create({
      network: 'goerli',
      providers: [
        {
          name: StarknetConnect.Provider.BLAST,
          apiKey: '1'
        }
      ]
    });

    const account = connector.createAccount({address: '0x123', privateKey: '0x456'});

    expect(account).to.be.an.instanceOf(Account);
    expect(account.address).to.equal('0x123');
    expect(connector).to.be.an.instanceOf(StarknetConnect);
    expect(connector.getProvider()).to.be.an.instanceOf(Provider);
  });
});
