import {useCallback} from 'react';
import {num} from 'starknet';

import {fetchAttestations} from '@api';
import {useBridgeContractAPI, useConstants} from '@hooks';
import {useL2Tokens} from '@providers';
import {isConsumed, isOnChain} from '@starkware-webapps/enums';
import {useLogger} from '@starkware-webapps/ui';

const {toBigInt} = num;

export const useFastWithdrawal = () => {
  const logger = useLogger('useFastWithdrawal');
  const tokensL2 = useL2Tokens();
  const fastWithdrawalSupported = tokensL2.some(token => token.fastWithdrawal);
  const {teleportThreshold} = useBridgeContractAPI();
  const {MONITOR_ATTESTATIONS_INTERVAL} = useConstants();

  const parseTeleportGUID = useCallback(
    event => [
      `0x${event.slice(0, 64)}`,
      `0x${event.slice(64, 128)}`,
      `0x${event.slice(128, 192)}`,
      `0x${event.slice(192, 256)}`,
      `0x${event.slice(256, 320)}`,
      `0x${event.slice(320, 384)}`,
      `0x${event.slice(384, 448)}`
    ],
    []
  );

  const getSignatures = useCallback(attestations => {
    const signatures = attestations
      .map(at => at.signatures.ethereum)
      .sort((a, b) => (toBigInt(`0x${a.signer}`).lt(toBigInt(`0x${b.signer}`)) ? -1 : 1))
      .map(eth => eth.signature);
    return `0x${signatures.join('')}`;
  }, []);

  const monitorAttestations = useCallback(
    async l2TxHash => {
      logger.log('Monitor attestations', {l2TxHash});
      const threshold = await teleportThreshold();
      const attestations = await fetchAttestations(l2TxHash, threshold);
      if (attestations) {
        return attestations;
      } else {
        return new Promise(resolve => {
          const monitorInterval = setInterval(async () => {
            const attestations = await fetchAttestations(l2TxHash, threshold);
            if (attestations) {
              clearInterval(monitorInterval);
              resolve(attestations);
            }
          }, MONITOR_ATTESTATIONS_INTERVAL);
        });
      }
    },
    [teleportThreshold]
  );

  return useCallback(
    async transfers => {
      const checkFastTransfers = async () => {
        const newTransfers = [];
        for (const transfer of transfers) {
          const {fastWithdrawal, l1TxHash, l2TxHash, l2TxStatus, customData} = transfer;
          if (
            (isConsumed(l2TxStatus) || isOnChain(l2TxStatus)) &&
            fastWithdrawal &&
            !l1TxHash &&
            !customData
          ) {
            const attestations = await monitorAttestations(l2TxHash);
            if (attestations.length) {
              const customData = {
                teleportGUID: parseTeleportGUID(attestations[0].data.event),
                signatures: getSignatures(attestations)
              };
              const transferData = {...transfer, customData};
              newTransfers.push(transferData);
            }
          }
        }
        return newTransfers;
      };
      return fastWithdrawalSupported ? await checkFastTransfers() : [];
    },
    [monitorAttestations, fastWithdrawalSupported]
  );
};
