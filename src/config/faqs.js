export const faqs = [
  {
    question: 'Where can I find more in-depth information on how StarkGate works?',
    answer: `
      <p>
        To understand how StarkGate works, please see this post, the
        <a href="//starknet.io/documentation/starkgate-token-bridge/" target="_blank">Technical Documentation</a>,
        the <a href="//github.com/starkware-libs/starkgate-contracts/tree/main/src/starkware/starknet/apps/starkgate" target="_blank">contract’s code</a>,
        and the <a href="//github.com/starkware-libs/starkgate-frontend" target="_blank">application code</a>.
      </p>
    `
  },
  {
    question: "I'm unable to use StarkGate Alpha; what could be the problem?",
    answer: `
        <p>
          The first version currently has some restrictions that may affect your ability
          to use StarkGate:
        </p>
        <ol type="a">
          <li>Make sure you are browsing from Chrome.</li>
          <li>Make sure you are not using incognito mode.</li>
          <li>
            Ensure that you have successfully installed the required wallets (MetaMask +
            Argent X). If you haven’t installed one of these wallets, please do so and
            refresh the page.
          </li>
          <li>
            There are limitations on the usage of the bridge. Make sure you do not exceed
            the permitted deposit amount, and that the bridge has not reached its upper
            limit for total value locked.
          </li>
          <li>
            This is an alpha version; disruptions and delays are expected– especially when
            there is high congestion. Please be patient and try again later :)
          </li>
        </ol>
    `
  },
  {
    question:
      'I performed the operation and have been waiting for completion for a long time. Why is that, and what should I do? ',
    answer: `
      <ol type="a">
        <li>
          This is a StarkGate Alpha version on an Alpha version of StarkNet. As a result,
          significant delays may occur due to congestion of the system.
        </li>
        <li>
          If you encounter a significant delay, we recommend that you:
          <ol type="i">
            <li>Do not exit the browser and then re-enter.</li>
            <li>Do not try to perform the same operation over and over again :)</li>
          </ol>
        </li>
      </ol>
    `
  },
  {
    question:
      'I performed a StarkNet → Ethereum transfer a few hours ago, and my balance on Ethereum has not been updated yet. What should I do?',
    answer: `
      <ol type="a">
        <li>
          The StarkNet → Ethereum transfer process is divided into two stages (docs).
        </li>
        <li>
          Note:
          <ol type="i">
            <li>A waiting period of several hours is expected between the stages.</li>
            <li>
              At the end of the first step, you will be required to sign in order to
              complete the transfer.
            </li>
            <li>
              The StarkNet → Ethereum transfer must be completed using the same browser
              (and PC) you used for the first step.
            </li>
          </ol>
        </li>
      </ol>
    `
  },
  {
    question:
      'What are the limitations that are intentionally constrained by StarkGate Alpha? Why do they exist? And, what will happen if they reach the limits?',
    answer: `
      <div>
        <p>
          StarkGate Alpha has two limitations at its first stage in order to reduce risk:
        </p>

        <ol type="a">
          <li>
            The total value locked (TVL) in the bridge on Etherum is limited for each token
            type: currently, the limit is $100k for each token.
          </li>
          <li>
            The maximum amount in each transaction sent from Ethereum to StarkNet via
            StarkGate is limited: currently, the single transaction limit is $50.
          </li>
        </ol>
        <p>
          We plan to gradually ease these limitations and lift them completely once we and
          the StarkNet ecosystem are confident that the system is fully secure. In the
          meantime, it will not be possible to perform an action that exceeds one of the
          restrictions.
        </p>
      </div>
    `
  },
  {
    question: 'Why there are restrictions on using the browser?',
    answer: `
        <p>
          In StarkGate Alpha, your transfer’s log history is saved in the local storage of
          the browser.
        </p>
        <p>As a result:</p>
        <ul>
          <li>
            Clearing the local storage will cause this data to be lost Logging to StarkGate
            using multiple devices/browsers can cause data inconsistency
          </li>
          <li>
            Logging to StarkGate using multiple devices/browsers can cause data
            inconsistency
          </li>
        </ul>
        <p>Therefore, we recommend when using StarkGate Alpha:</p>
        <ul>
          <li>Refrain from closing or switching browsers (or PC)</li>
          <li>Do not refresh the page while the transfer is being processed</li>
          <li>Do not delete the local storage of the browser</li>
        </ul>
    `
  },
  {
    question:
      "I can't find solutions to the problems I encountered while using StarkGate. Where can I get help?",
    answer: `
      <p>We have opened a <em>community channel on Discord</em> to help each other use StarkGate.</p>
    `
  }
];
