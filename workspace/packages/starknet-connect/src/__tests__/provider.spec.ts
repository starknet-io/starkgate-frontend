import {assert, expect} from 'chai';
import sinon from 'sinon';
import {LibraryError, RpcProvider, constants} from 'starknet';

import {Provider, ProviderName} from '../provider';

describe('Provider', () => {
  let provider: Provider;
  let stub: sinon.SinonStub;

  const txHash = '0x123234';

  before(() => {
    stub = sinon.stub(RpcProvider.prototype, 'getTransactionByHash');
  });

  beforeEach(async () => {
    provider = Provider.create({
      chainId: constants.StarknetChainId.SN_MAIN,
      providers: [
        {name: ProviderName.BLAST, apiKey: '1'},
        {name: ProviderName.INFURA, apiKey: '2'},
        {name: ProviderName.CHAINSTACK, apiKey: '3', nodeId: '1'}
      ]
    });
  });

  afterEach(() => {
    stub.reset();
  });

  it('should success on first call', async () => {
    stub.onFirstCall().resolves({transaction_hash: txHash} as any);

    const result = await provider.getTransactionByHash(txHash);

    expect(result).to.deep.equal({transaction_hash: txHash});
    expect(stub.calledOnce).to.be.true;
  });

  it('should success on second call', async () => {
    stub.onFirstCall().rejects(new Error('error'));
    stub.onSecondCall().resolves({transaction_hash: txHash} as any);

    const result = await provider.getTransactionByHash(txHash);

    expect(result).to.deep.equal({transaction_hash: txHash});
    expect(stub.calledTwice).to.be.true;
  });

  it('should success on third call', async () => {
    stub.onFirstCall().rejects(new Error('error'));
    stub.onSecondCall().rejects(new Error('error'));
    stub.onThirdCall().resolves({transaction_hash: txHash} as any);

    const result = await provider.getTransactionByHash(txHash);

    expect(result).to.deep.equal({transaction_hash: txHash});
    expect(stub.calledThrice).to.be.true;
  });

  it('should throw an error on first call', async () => {
    stub.onFirstCall().rejects(new LibraryError('library-error'));

    try {
      await provider.getTransactionByHash(txHash);
      assert.fail('should throw an error');
    } catch (err: any) {
      expect(err.message).to.equal('library-error');
      expect(stub.calledOnce).to.be.true;
    }
  });

  it('should throw an error on second call', async () => {
    stub.onFirstCall().rejects(new Error('error'));
    stub.onSecondCall().rejects(new LibraryError('library-error'));

    try {
      await provider.getTransactionByHash(txHash);
      assert.fail('should throw an error');
    } catch (err: any) {
      expect(err.message).to.equal('library-error');
      expect(stub.calledTwice).to.be.true;
    }
  });

  it('should throw an error on third call', async () => {
    stub.onFirstCall().rejects(new Error('error'));
    stub.onSecondCall().rejects(new Error('error'));
    stub.onThirdCall().rejects(new LibraryError('library-error'));

    try {
      await provider.getTransactionByHash(txHash);
      assert.fail('should throw an error');
    } catch (err: any) {
      expect(err.message).to.equal('library-error');
      expect(stub.calledThrice).to.be.true;
    }
  });

  it('should throw after all providers are not available', async () => {
    stub.onFirstCall().rejects(new Error('library-error-1'));
    stub.onSecondCall().rejects(new Error('library-error-2'));
    stub.onThirdCall().rejects(new Error('library-error-3'));

    try {
      await provider.getTransactionByHash(txHash);
      assert.fail('should throw an error');
    } catch (err: any) {
      expect(err.message).to.equal('No available providers to handle the request.');
      expect(stub.calledThrice).to.be.true;
    }
  });
});
