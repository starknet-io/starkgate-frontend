export const FAQ_text =
  '1. Where can I find more in-depth information on how StarkGate works?' +
  'A: To understand how StarkGate works, please see this post, the technical documentation, the contract’s code, and the front end code.' +
  '2. I’m unable to use StarkGate Alpha; what could be the problem?' +
  'A: The first version currently has some restrictions that may affect your ability to use StarkGate:' +
  'Make sure you are browsing from Chrome.' +
  'Make sure you are not using incognito mode.' +
  'Ensure that you have successfully installed the required wallets (MetaMask + Argent X). If you haven’t installed one of these wallets, please do so and refresh the page.' +
  'There are limitations on the usage of the bridge. Make sure you do not exceed the permitted deposit amount, and that the bridge has not reached its upper limit for total value locked ' +
  'This is an alpha version; disruptions and delays are expected – especially when there is high congestion. Please be patient and try again later :)' +
  '3. I performed the operation and have been waiting for completion for a long time. Why is that, and what should I do?' +
  'A: This is a StarkGate Alpha version on an Alpha version of StarkNet. As a result, significant delays may occur due to congestion of the system.' +
  'If you encounter a significant delay, we recommend that you:' +
  'Do not exit the browser and then re-enter.' +
  'Do not try to perform the same operation over and over again :)' +
  '4. I performed a withdrawal operation a few hours ago, and my balance on L1 has not been updated yet. What should I do?' +
  'A: The withdrawal process is divided into two stages (docs).' +
  'Note:' +
  'A waiting period of several hours is expected between the stages.' +
  'At the end of the first step, you will be required to sign in order to complete the transfer.' +
  'The withdrawal operation must be completed using the same browser (and PC) you used for the first step.' +
  '5. What are the limitations that are intentionally constrained by StarkGate Alpha? Why do they exist? And, what will happen if they reach the limits?' +
  'A: StarkGate Alpha has two limitations at its first stage in order to reduce risk: ' +
  'The total value locked (TVL) in the bridge on L1 is limited for each token type: currently, the limit is $100k for each token.' +
  'The maximum amount in each transaction sent from L1 to L2 (Ethereum->StarkNet) via StarkGate is limited: currently, the single transaction limit is $50.' +
  'We plan to gradually ease these limitations and lift them completely once we and the StarkNet ecosystem are confident that the system is fully secure. In the meantime, it will not be possible to perform an action that exceeds one of the restrictions.' +
  '6. Why there are restrictions on using the browser?' +
  '  A: In StarkGate Alpha, your transfer’s log history is saved in the local storage of the browser.' +
  'As a result:' +
  'Clearing the local storage will cause this data to be lost' +
  'Logging to StarkGate using multiple devices/browsers can cause data inconsistency' +
  'Therefore, we recommend when using StarkGate Alpha:' +
  ' - Refrain from closing or switching browsers (or PC)' +
  ' - Do not refresh the page while the transfer is being processed' +
  ' - Do not delete the local storage of the browser' +
  '7. I can’t find solutions to the problems I encountered while using StarkGate. Where can I get help?' +
  'A: We have opened a community channel on Discord to help each other use StarkGate.';
