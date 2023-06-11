import {
  FEEDBACK_FORM_URL_GOERLI,
  FEEDBACK_FORM_URL_MAINNET,
  STARKGATE_CONTRACTS_REPO_URL,
  STARKGATE_DOCS_URL,
  STARKGATE_FRONTEND_REPO_URL,
  STARKNET_ADDRESSES_REPO_URL
} from '@config/constants';

export default [
  {
    question:
      'I performed a transfer from Starknet to Ethereum a few hours ago, and my balance on Ethereum has not been updated yet. What should I do?',
    answer: (
      <>
        <p>
          The process of sending transactions from Starknet to Ethereum is divided into{' '}
          <a href={STARKGATE_DOCS_URL} rel="noreferrer" target="_blank">
            two stages
          </a>
          .
        </p>
        <ol type="a">
          <li>A waiting period of several hours is expected between the stages.</li>
          <li>
            At the end of the first step, you will be required to sign in order to complete the
            transfer.
          </li>
        </ol>
      </>
    )
  },
  {
    question: 'Where can I find more in-depth information on how StarkGate works?',
    answer: (
      <p>
        To understand how StarkGate works, please see this post, the{' '}
        <a href={STARKGATE_DOCS_URL} rel="noreferrer" target="_blank">
          Technical Documentation
        </a>
        , the{' '}
        <a href={STARKGATE_CONTRACTS_REPO_URL} rel="noreferrer" target="_blank">
          contract’s code
        </a>
        , and the{' '}
        <a href={STARKGATE_FRONTEND_REPO_URL} rel="noreferrer" target="_blank">
          application code
        </a>
        .
      </p>
    )
  },
  {
    question: "I'm unable to use StarkGate Alpha; what could be the problem?",
    answer: (
      <>
        <p>
          The first version currently has some restrictions that may affect your ability to use
          StarkGate:
        </p>
        <ol type="a">
          <li>Make sure you are browsing from Chrome or Firefox.</li>
          <li>Make sure you are not using incognito mode.</li>
          <li>
            Ensure that you have successfully installed the required wallets (MetaMask and a
            Starknet wallet). If you haven’t installed one of these wallets, please do so and
            refresh the page.
          </li>
          <li>
            There are <em>limitations on the usage of the StarkGate bridge</em>. Make sure you do
            not exceed these.
          </li>
          <li>
            This is an <b>alpha version</b>; disruptions and delays are expected – especially when
            there is high congestion. Please be patient and try again later :)
          </li>
        </ol>
      </>
    )
  },
  {
    question:
      'I performed the operation and have been waiting for completion for a long time. Why is that, and what should I do? ',
    answer: (
      <ol type="a">
        <li>
          This is an Alpha version of StarkGate operating on an <b>Alpha</b> version of Starknet. As
          a result, significant delays may occure due to congestion of the system.
        </li>
        <li>
          If you encounter a significant delay, we recommend that you:
          <ol type="i">
            <li>Do not exit the browser and then re-enter.</li>
            <li>Do not try to perform the same operation over and over again.</li>
          </ol>
        </li>
      </ol>
    )
  },
  {
    question:
      'What are the limitations that are intentionally constrained on StarkGate Alpha? Why do they exist? And, what will happen if the limits are reached?',
    answer: (
      <div>
        <p>StarkGate Alpha has two limitations at its first stage in order to reduce risk:</p>
        <ol type="a">
          <li>
            The total value locked (TVL) in the bridge on Ethereum is limited for each token type.
          </li>
          <li>
            The maximum amount in each transaction sent from Ethereum to Starknet via StarkGate is
            limited.
          </li>
        </ol>
        <p>
          <b>
            Take a look at the{' '}
            <a
              href={`${STARKGATE_DOCS_URL}/#starkgate-alpha-limitations`}
              rel="noreferrer"
              target="_blank"
            >
              documentation
            </a>{' '}
            to see the updated numbers, stay tuned.
          </b>
        </p>
        <p>
          We plan to gradually ease these limitations and lift them completely, as confidence grows.
          In the meantime, it will not be possible to perform an operation that exceeds one of the
          restrictions.
        </p>
      </div>
    )
  },
  {
    question: 'Why can’t I use StarkGate with {insert favorite}Token?',
    answer: (
      <ol type="a">
        <li>
          StarkGate Alpha on Goerli supports ETH and a few other ERC-20 tokens. The full list and
          the relevant contract addresses on Goerli, both on Ethereum and Starknet, are available in
          this{' '}
          <a href={STARKNET_ADDRESSES_REPO_URL} rel="noreferrer" target="_blank">
            repo
          </a>
          .
        </li>
        <li>
          On Mainnet, initially, StarkGate Alpha will only support ETH to allow use of the fee
          mechanism. Later on, we will add support for WBTC, USDC, USDT, and DAI. Further down the
          road, we will publish the mechanism for adding support for additional tokens. The relevant
          contract addresses on Mainnet are available in this{' '}
          <a
            href={`${STARKNET_ADDRESSES_REPO_URL}/blob/master/bridged_tokens/mainnet.json`}
            rel="noreferrer"
            target="_blank"
          >
            repo
          </a>
          .
        </li>
      </ol>
    )
  },
  {
    question:
      "Where's the best place to write detailed feedback to help improve future versions of StarkGate?",
    answer: (
      <>
        <p>Here:</p>
        <ul>
          <li>
            <a href={FEEDBACK_FORM_URL_GOERLI} rel="noreferrer" target="_blank">
              StarkGate Alpha on Goerli
            </a>
          </li>
          <li>
            <a href={FEEDBACK_FORM_URL_MAINNET} rel="noreferrer" target="_blank">
              StarkGate Alpha on Mainnet
            </a>
          </li>
        </ul>
      </>
    )
  }
];
