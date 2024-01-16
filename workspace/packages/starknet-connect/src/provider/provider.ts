import {
  AccountInvocationItem,
  AccountInvocations,
  BigNumberish,
  BlockIdentifier,
  Call,
  CallL1Handler,
  ContractVersion,
  DeclareContractTransaction,
  DeployAccountContractTransaction,
  Invocation,
  InvocationsDetailsWithNonce,
  ProviderInterface,
  RPC,
  RpcProvider,
  constants,
  getContractVersionOptions,
  getEstimateFeeBulkOptions,
  getSimulateTransactionOptions,
  types,
  waitForTransactionOptions
} from 'starknet';

import {ProviderManager} from './manager';
import {ProvidersConfig} from './types';

export class Provider implements ProviderInterface {
  private constructor(private readonly manager: ProviderManager) {}

  public static create(config: ProvidersConfig): Provider {
    const manager = ProviderManager.create(config);

    return new Provider(manager);
  }

  public async getTransactionStatus(transactionHash: BigNumberish) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getTransactionStatus(transactionHash);
    });
  }

  public async estimateMessageFee(callL1Handler: CallL1Handler, blockIdentifier?: BlockIdentifier) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.estimateMessageFee(callL1Handler, blockIdentifier);
    });
  }

  public async simulateTransaction(
    invocations: AccountInvocations,
    {blockIdentifier, skipValidate, skipExecute, skipFeeCharge}: getSimulateTransactionOptions = {}
  ) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.simulateTransaction(invocations, {
        blockIdentifier,
        skipValidate,
        skipExecute,
        skipFeeCharge
      });
    });
  }

  public async getTransactionByHash(txHash: string) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getTransactionByHash(txHash);
    });
  }

  public async getTransactionReceipt(txHash: string) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getTransactionReceipt(txHash);
    });
  }

  public async callContract(call: Call, blockIdentifier?: BlockIdentifier) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.callContract(call, blockIdentifier);
    });
  }

  public async waitForTransaction(txHash: BigNumberish, options?: waitForTransactionOptions) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.waitForTransaction(txHash, options);
    });
  }

  public async getClassAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getClassAt(contractAddress, blockIdentifier);
    });
  }

  public async getClassByHash(classHash: BigNumberish) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getClassByHash(classHash);
    });
  }

  public async getChainId(): Promise<constants.StarknetChainId> {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getChainId();
    });
  }

  public async getSpecVersion() {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getSpecVersion();
    });
  }

  public async getNonceForAddress(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getNonceForAddress(contractAddress, blockIdentifier);
    });
  }

  public async getBlock(blockIdentifier: BlockIdentifier) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getBlock(blockIdentifier);
    });
  }

  public getBlockHashAndNumber = this.getBlockLatestAccepted;

  public async getBlockLatestAccepted() {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getBlockLatestAccepted();
    });
  }

  public async getBlockNumber() {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getBlockNumber();
    });
  }

  public async getBlockWithTxHashes(blockIdentifier: BlockIdentifier) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getBlockWithTxHashes(blockIdentifier);
    });
  }

  public async getBlockStateUpdate(blockIdentifier: BlockIdentifier) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getBlockStateUpdate(blockIdentifier);
    });
  }

  public getStateUpdate = this.getBlockStateUpdate;

  public async getBlockTransactionsTraces(
    blockIdentifier: BlockIdentifier
  ): Promise<types.RPC.BlockTransactionsTraces> {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getBlockTransactionsTraces(blockIdentifier);
    });
  }

  public traceBlockTransactions = this.getBlockTransactionsTraces;

  public async getBlockTransactionCount(blockIdentifier: BlockIdentifier) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getBlockTransactionCount(blockIdentifier);
    });
  }

  public async getPendingTransactions() {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getPendingTransactions();
    });
  }

  public async getTransaction(txHash: BigNumberish) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getTransaction(txHash);
    });
  }

  public async getTransactionByBlockIdAndIndex(blockIdentifier: BlockIdentifier, index: number) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getTransactionByBlockIdAndIndex(blockIdentifier, index);
    });
  }

  public async getTransactionTrace(txHash: BigNumberish): Promise<types.RPC.TransactionTrace> {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getTransactionTrace(txHash);
    });
  }

  public traceTransaction = this.getTransactionTrace;

  public getSimulateTransaction = this.simulateTransaction;

  public async getStorageAt(
    contractAddress: BigNumberish,
    key: BigNumberish,
    blockIdentifier: BlockIdentifier
  ) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getStorageAt(contractAddress, key, blockIdentifier);
    });
  }

  public async getClassHashAt(contractAddress: BigNumberish, blockIdentifier: BlockIdentifier) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getClassHashAt(contractAddress, blockIdentifier);
    });
  }

  public async getClass(classHash: BigNumberish, blockIdentifier: BlockIdentifier) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getClass(classHash, blockIdentifier);
    });
  }

  public async getContractVersion(
    contractAddress: BigNumberish,
    classHash?: undefined,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;

  public async getContractVersion(
    contractAddress: undefined,
    classHash: BigNumberish,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;

  public async getContractVersion(
    contractAddress?: BigNumberish,
    classHash?: BigNumberish,
    {blockIdentifier, compiler = true}: getContractVersionOptions = {}
  ) {
    return await this.manager.call(async (provider: RpcProvider) => {
      if (contractAddress !== undefined) {
        return await provider.getContractVersion(contractAddress, undefined, {
          blockIdentifier,
          compiler
        });
      }

      if (classHash !== undefined) {
        return await provider.getContractVersion(undefined, classHash, {
          blockIdentifier,
          compiler
        });
      }
    });
  }

  public async getEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier
  ) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getEstimateFee(invocation, invocationDetails, blockIdentifier);
    });
  }

  public async getInvokeEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier
  ) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getInvokeEstimateFee(invocation, invocationDetails, blockIdentifier);
    });
  }

  public async getDeclareEstimateFee(
    invocation: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier
  ) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getDeclareEstimateFee(invocation, details, blockIdentifier);
    });
  }

  public async getDeployAccountEstimateFee(
    invocation: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier
  ) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getDeployAccountEstimateFee(invocation, details, blockIdentifier);
    });
  }

  public async getEstimateFeeBulk(
    invocations: AccountInvocations,
    {blockIdentifier, skipValidate = false}: getEstimateFeeBulkOptions
  ) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getEstimateFeeBulk(invocations, {blockIdentifier, skipValidate});
    });
  }

  public async invokeFunction(
    functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce
  ) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.invokeFunction(functionInvocation, details);
    });
  }

  public async declareContract(
    {contract, signature, senderAddress, compiledClassHash}: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.declareContract(
        {contract, signature, senderAddress, compiledClassHash},
        details
      );
    });
  }

  public async deployAccountContract(
    {classHash, constructorCalldata, addressSalt, signature}: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.deployAccountContract(
        {classHash, constructorCalldata, addressSalt, signature},
        details
      );
    });
  }

  public async getSyncingStats() {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getSyncingStats();
    });
  }

  public async getEvents(eventFilter: RPC.EventFilter) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getEvents(eventFilter);
    });
  }

  public async getStarkName(address: BigNumberish, StarknetIdContract?: string): Promise<string> {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getStarkName(address, StarknetIdContract);
    });
  }

  public async getAddressFromStarkName(name: string, StarknetIdContract?: string): Promise<string> {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getAddressFromStarkName(name, StarknetIdContract);
    });
  }

  public buildTransaction(invocation: AccountInvocationItem, versionType?: 'fee' | 'transaction') {
    return this.manager.call(async (provider: RpcProvider) => {
      return provider.buildTransaction(invocation, versionType);
    });
  }

  public async getCode(_contractAddress: string, _blockIdentifier?: BlockIdentifier) {
    return await this.manager.call(async (provider: RpcProvider) => {
      return await provider.getCode(_contractAddress, _blockIdentifier);
    });
  }
}
