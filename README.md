<p align="center">
  <img style="position: absolute; left: 50%; transform: translateX(-50%)" src="https://github.com/starkware-libs/starkgate-frontend/blob/dev/src/assets/img/stars.png?raw=true"  alt=""/>
  <img src="https://github.com/starkware-libs/starkgate-frontend/blob/dev/src/assets/img/starkgate.svg?raw=true"  alt=""/>
</p>

<h2 align='center'> Token Bridge for StarkNet</h2>

<p align="center">
    <a href="https://github.com/facebook/react">
        <img src="https://badges.aleen42.com/src/react.svg" alt="">
    </a>    
    <a href="https://github.com/prettier/prettier">
        <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="">
    </a>
  <a href="https://starkware.co/">
    <img src="https://img.shields.io/badge/powered_by-StarkWare-navy">
  </a>
</p>

StarkNet is a permissionless decentralized Rollup operating as an L2 network over Ethereum.\
The _StarkNet bridge_ allows users to transfer ERC20 tokens from Ethereum to StarkNet and vice versa.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

1. Install `NPM` and `Node.js`. See [Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Make sure you've `yarn` installed globally on your machine `npm i -g yarn`.

## Installation

Clone and run `yarn` to install dependencies:

```
git clone https://github.com/starkware-libs/starkgate-frontend.git
cd starkgate-frontend
yarn install
```

## Development

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Production

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## `.env` Files

`.env` files are increasingly popular as a way to configure an application. Their values are injected into the
application bundle during build time.\
The appropriate files are loading according to the `REACT_APP_ENV` value.\
`.env` (global values for all environments)\
`.env.development` (values for development env, i.e `REACT_APP_ENV=development`)\
`.env.goerli` (values for goerli env, i.e, `REACT_APP_ENV=goerli`)\
`.env.mainnet` (values for mainnet env, i.e, `REACT_APP_ENV=mainnet`)

> Note: each file can be overridden on a local environment using matching `.env.[ENV].local` file.

## Wallet Support

`WIP`

## Tokens Support

`WIP`

## Project Structure

`WIP`

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see
the [tags on this repository](https://github.com/starkware-libs/starkgate-frontend/releases).

## License

`WIP`
