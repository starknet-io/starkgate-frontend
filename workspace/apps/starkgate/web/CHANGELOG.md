# @starkgate/web

## 1.21.0

### Minor Changes

- f12f63e9: StarkGate's UI now increases the gas_estimate by +15% for L1 transactions (Deposit, Withdrawal and Approve)
- b6623fdd: Dynamic Update: Upgraded to v1.

### Patch Changes

- a292f160: We have removed the "Alpha" pop-up disclaimer.

## 1.20.0

### Minor Changes

- 9c0e024d: \* Updated Logo: Introduced the new StarkGate logo.
  - Dynamic Update: Upgraded to version 0.19.
  - External Bridges: Added Rhino for deposit and withdrawal functionalities.
  - Bug Fix: Resolved an issue preventing the sending of Google Analytics events.
  - Improved main page title and meta data for enhanced search results.
  - Ensured unique Title and Meta descriptions for each page.

## 1.19.0

### Minor Changes

- 4243d43: Due to the deprecation of the feeder gateway, this update introduces management of RPC providers, prioritizing BlastAPI as our primary provider, followed by Chainstack and Infura, to enhance control and optimize our services, moving away from reliance on traditional wallet providers.

## 1.18.0

### Minor Changes

- 0496c1d5: Expanded automatic withdrawal capabilities to include additional tokens: DAI, rETH, wstETH, R, FRAX, FXS, and sfrxETH.
- 0496c1d5: Modified the Terms of Use acceptance process: Users now encounter a disclaimer during the "Connect Wallet" flow, where they must acknowledge acceptance of the terms before proceeding. The full Terms of Use are accessible via a link from the disclaimer.
- b592daaa: Introduced UNI token integration within StarkGate.

## 1.17.0

### Minor Changes

- 15a17e3c: Added tokens support - LUSD, R, FRAX, FXS and sfrxETH.

### Patch Changes

- f179552f: Added an error message to the Transfer Log for a case where the log gets an error and temporily has no information to show.

## 1.16.1

### Patch Changes

- bcf2e258: Fixed an issue in the Transfer Log where the collapse arrow appears, indicating that the log has information, when in fact no transfers have taken place and there is no information to show.
- 043becc0: Bump Dynamic version to 0.18.15

## 1.16.0

### Minor Changes

- ae422cac: Enable users to select which block explorer they want to use for inspecting their transactions.

### Patch Changes

- 6e26712a: Fixed a bug where approve tx throws an error by MetaMask
- 4850b77a: Bump dynamic version to 0.18.12

## 1.15.0

### Minor Changes

- 37edbf5: Integrate Dynamic SDK (a multi-chain wallet adapter) for our application login flow.

### Patch Changes

- db42006: Fix an issue where the transfer log sign is incorrect.

## 1.14.4

### Patch Changes

- 7cfd51a: Update the mainnet wstETH addresses and display it back to the UI

## 1.14.3

### Patch Changes

- 12c0ec4: Fixed a bug where pending withdrawals are not displayed when the user is only connected to L1 wallet.
- 6e89d16: Upgrade to `get-starknet` _v3_

## 1.14.2

### Patch Changes

- 5f526da: Fixed an issue where users can still complete an auto withdrawal transaction on L1 by themselves and thus pay for the transaction twice.
- 12a8fad: Enable rETH and wstETH on mainnet

## 1.14.1

### Patch Changes

- 392c6d4: Fixed an issue where the auto withdrawal got stuck

## 1.14.0

### Minor Changes

- 78670c0: Add an option to Auto withdraw ERC20 tokens from Starknet to Ethereum
- 028bc7a: Send analytics to both Google analytics and Splitbee
- 087239d: Add layerswap to bridging options

### Patch Changes

- d0953a4: Fixed issues with the blocked modal:
  - The blocked modal appears only once (closing and reconnecting doesn’t trigger it again)
  - The screening error gets raised twice - immediately and after the retry (from the second try to connect)
  - The loading indication doesn't appear during the error retrying

## 1.12.1-dev.0

### prerelease changes

- screening using useQuery (#47)

## 1.12.1-dev.1

### prerelease changes

- dynamic icon using useQuery (#49)

## 1.12.1-dev.2

### prerelease changes

- staleTime to dynamic import (#57)

## 1.12.1-dev.3

### prerelease changes

- contact us tab (#58)

## 1.12.1-dev.4

### prerelease changes

- prettier isn't running for eslint (#64)

## 1.12.1-dev.5

### prerelease changes

- web3 utils signature (#65)

## 1.12.1-dev.6

### prerelease changes

- get-eligibility for eth and starknet (#70)

## 1.12.1-dev.7

### prerelease changes

- wallet login screen (#76)

## 1.12.1-dev.8

### prerelease changes

- remove compliance mail from blocked modal (#80)

## 1.12.1-dev.9

### prerelease changes

- add pnpm overrides to ethereumjs-abi peer dep (#85)

## 1.12.1-dev.10

### prerelease changes

- fetch eligibility from api (#84)

## 1.12.1-dev.11

### prerelease changes

- http-client, js-logger, slack-notifier packages (#102)

## 1.12.1-dev.12

### prerelease changes

- disable app for mobile devices (#89)

## 1.12.1-dev.13

### prerelease changes

- add new tokens to the UI (#112)

## 1.12.1-dev.14

### prerelease changes

- change "StarkNet" to "Starknet" (#116)

## 1.12.1-dev.15

### prerelease changes

- is hex change (#114)

## 1.12.1-dev.16

### prerelease changes

- update links in the terms page (#118)

## 1.13.0-dev.17

### prerelease changes

- bump package.json to 1.13 (#121)

## 1.13.0-dev.18

### prerelease changes

- export types and configs (starkex, eligibility) (#120)

## 1.13.0-dev.19

### prerelease changes

- import @ui style (#128)

## 1.13.0-dev.20

### prerelease changes

- v1.13 fixes before release (#130)

## 1.13.0-dev.21

### prerelease changes

- root level scripting and ports assignment (#134)

## 1.13.0-dev.22

### prerelease changes

- sometimes connecting to MetaMask is blocked (#137)

## 1.13.0-dev.23

### prerelease changes

- google analytics (#133)

## 1.13.0-dev.24

### prerelease changes

- google analytics (#139)
