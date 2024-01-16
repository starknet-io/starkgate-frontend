# Starknet Connection Library

This library provides a set of classes to interact with the Starknet blockchain. With it, you can connect to different
Starknet networks, manage accounts, and query transactions.

## Features

- Connect to Starknet networks (`main`, `goerli` or a custom one).
- Create and manage Starknet accounts.
- Create and manage RPC Provider.

## Classes and Types

- `StarknetConnect`: Main class to establish connections and create accounts.
- `Provider`: Handles RPC calls to the Starknet network.
  Various types for configuration and network interactions.

## Configuration

The configuration of the Starknet connection library involves several key objects that allow you to set up and customize
your interaction with the Starknet blockchain. Below are details on the primary configuration objects and how to use
them.

### `StarknetConnectConfig`

This configuration object defines the parameters needed to establish a connection to a specific Starknet network. It can come in two flavors:

#### A standard network

- `network`: Specifies the network to connect to. Acceptable values are 'main' for the main network and 'goerli' for the
  Goerli test network.
- `providers`: An optional array of ProviderConfig objects that detail the blockchain providers you wish to use for
  connecting to the Starknet network.

Example usage:

```typescript
const starknetConnectConfig = {
  network: 'main',
  providers: [
    // Provider configurations
  ]
};
```

#### A custom network

- `chainId`: The chain ID corresponding to the Starknet network, typically obtained from `constants.StarknetChainId`, but can be custom
- `providers`: An optional array of URLProviderConfig objects that detail the blockchain providers you wish to use for
  connecting to the Starknet network.

### `ProvidersConfig`

This object provides a configuration for the Provider class, which manages RPC calls to the Starknet network.

- `chainId`: The chain ID corresponding to the Starknet network, typically obtained from `constants.StarknetChainId`.
- `providers`: An array of ProviderConfig objects, each containing details for a specific provider. These can be specified by name of the provider and api key and optionally a node ID, or, by the base url of the provider.

- Example usage:

```typescript
const providersConfig = {
  chainId: constants.StarknetChainId.MAINNET,
  providers: [
    {
      name: StarknetConnect.Provider.ALCHEMY,
      apiKey: 'your-alchemy-api-key'
    },
    {
      baseUrl: 'https://private.custom-provider.com'
    }
    // Additional provider configurations
  ]
};
```

### `ProviderConfig`

This object details individual configurations for blockchain providers. It can take the form of either
ApiKeyProviderConfig, NodeIdProviderConfig or URLProviderConfig, depending on the provider.

- `name`: The name of the provider, referenced using the StarknetConnect.Provider enum.
- `apiKey`: The API key provided by the service (used by ApiKeyProviderConfig).
- `nodeId`: The node ID (used by NodeIdProviderConfig along with an apiKey).
- `baseUrl`: The base URL of the provider (used by URLProviderConfig).

- Example usage:

```typescript
const apiKeyProviderConfig = {
  name: StarknetConnect.Provider.INFURA,
  apiKey: 'your-infura-api-key'
};

const nodeIdProviderConfig = {
  name: StarknetConnect.Provider.CHAINSTACK,
  nodeId: 'your-chainstack-node-id',
  apiKey: 'your-chainstack-api-key'
};

const urlProviderConfig = {
  baseUrl: 'https://private.custom-provider.com'
};
```

## Usage

### Connecting to Starknet

To connect to a Starknet network:

```typescript
import {StarknetConnect} from '[your-library-path]';

const config = {
  network: 'main',
  providers: [
    // Your provider configurations
  ]
};

const starknetConnect = StarknetConnect.create(config);
```

### Managing Accounts

To create a new Starknet account:

```typescript
const accountParams = {
  address: '0x...',
  privateKey: '0x...'
};

const account = starknetConnect.createAccount(accountParams);
```

### Using the Provider

To get the configured provider:

```typescript
import {StarknetConnect} from '@starkware-webapps/starknet-connect';

// Example provider configuration for StarknetConnect using the Provider enum
const starknetConnectConfig = {
  network: 'main', // or 'goerli' for the test network
  providers: [
    {
      name: StarknetConnect.Provider.ALCHEMY,
      apiKey: 'your-alchemy-api-key'
    },
    {
      name: StarknetConnect.Provider.BLAST,
      apiKey: 'your-blast-api-key'
    },
    {
      name: StarknetConnect.Provider.CHAINSTACK,
      nodeId: 'your-chainstack-node-id',
      apiKey: 'your-chainstack-api-key'
    },
    {
      name: StarknetConnect.Provider.INFURA,
      apiKey: 'your-infura-api-key'
    }
  ]
};

// To create a connection with the above configuration
const starknetConnect = StarknetConnect.create(starknetConnectConfig);

// Use the getProvider() method to get the configured provider
const provider = starknetConnect.getProvider();

// Assuming that the provider has a method to get transaction by hash
// Note: You need to implement this functionality if it's not already present
const txHash = '0x123...'; // replace with an actual transaction hash
const transactionDetails = await provider.getTransactionByHash(txHash);

// Log the transaction details to the console
console.log(transactionDetails);
```
