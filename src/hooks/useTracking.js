import {useTracking} from '@starkware-industries/commons-js-hooks';
import {useCallback} from 'react';

import {track, TrackEvent} from '../analytics';
import {MenuType} from '../enums';

export const useMenuTracking = () => {
  const [trackAccountMenu, trackTransferMenu, trackSelectTokenMenu] = useTracking(track, [
    TrackEvent.ACCOUNT_MENU,
    TrackEvent.TRANSFER_MENU,
    TrackEvent.SELECT_TOKEN_MENU
  ]);

  return useCallback(menu => {
    switch (menu) {
      case MenuType.ACCOUNT:
        trackAccountMenu();
        break;
      case MenuType.SELECT_TOKEN:
        trackSelectTokenMenu();
        break;
      case MenuType.SOURCE:
      default:
        trackTransferMenu();
        break;
    }
  }, []);
};

export const useLoginTracking = () => {
  return useTracking(track, [...Object.values(TrackEvent.LOGIN)]);
};

export const useTermsTracking = () => {
  return useTracking(track, [TrackEvent.TERMS_SCREEN, ...Object.values(TrackEvent.TERMS)]);
};

export const useTransferTracking = () => {
  return useTracking(track, [TrackEvent.TRANSFER.MAX_CLICK, TrackEvent.TRANSFER.SWAP_NETWORK]);
};

export const useTransferToL1Tracking = () => {
  return useTracking(track, [...Object.values(TrackEvent.TRANSFER.TRANSFER_TO_L1)]);
};

export const useTransferToL2Tracking = () => {
  return useTracking(track, [...Object.values(TrackEvent.TRANSFER.TRANSFER_TO_L2)]);
};

export const useCompleteTransferToL1Tracking = () => {
  return useTracking(track, [...Object.values(TrackEvent.TRANSFER.COMPLETE_TRANSFER_TO_L1)]);
};

export const useAccountTracking = () => {
  return useTracking(track, [...Object.values(TrackEvent.ACCOUNT)]);
};

export const useSelectTokenTracking = () => {
  return useTracking(track, [...Object.values(TrackEvent.SELECT_TOKEN)]);
};

export const useConnectWalletTracking = () => {
  return useTracking(track, [
    TrackEvent.CONNECT_WALLET_CLICK,
    TrackEvent.CONNECT_ETHEREUM_WALLET_CLICK,
    TrackEvent.CONNECT_STARKNET_WALLET_CLICK
  ]);
};

export const useFaqTracking = () => {
  return useTracking(track, TrackEvent.FAQ_SCREEN);
};

export const useDiscordTabTracking = () => {
  return useTracking(track, TrackEvent.DISCORD_TAB_CLICK);
};
