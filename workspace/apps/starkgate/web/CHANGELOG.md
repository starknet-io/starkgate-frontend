# @starkgate/web

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
