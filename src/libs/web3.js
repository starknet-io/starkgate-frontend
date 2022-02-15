import Web3 from 'web3';

let web3;
if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.ethereum || window.web3.currentProvider);
} else {
  web3 = new Web3();
}

export {web3};
