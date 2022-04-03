export const TransferToL1Message = () => {
  return (
    <p>
      The StarkNet → Ethereum transfer divided into two stages (
      <a href="https://starknet.io/documentation/starkgate-token-bridge/">Docs</a>):
      <ul>
        <li>A waiting period of several hours is expected between the stages.</li>
        <li>
          At the end of the first step, you will be required to sign in order to complete the
          transfer.
        </li>
      </ul>
    </p>
  );
};
