import {useCallback} from 'react';

import {TrackEventType, track} from '@analytics';
import {MenuType} from '@enums';
import {useTracking} from '@starkware-webapps/ui';

export const useMenuTracking = () => {
  const [trackAccountMenu, trackTransferMenu, trackSelectTokenMenu] = useTracking(track, [
    TrackEventType.ACCOUNT_MENU,
    TrackEventType.TRANSFER_MENU,
    TrackEventType.SELECT_TOKEN_MENU
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
  return useTracking(track, [...Object.values(TrackEventType.LOGIN)]);
};

export const useTermsTracking = () => {
  return useTracking(track, [TrackEventType.TERMS_SCREEN, ...Object.values(TrackEventType.TERMS)]);
};

export const useTransferTracking = () => {
  return useTracking(track, [
    TrackEventType.TRANSFER.MAX_CLICK,
    TrackEventType.TRANSFER.SWAP_NETWORK
  ]);
};

export const useTransferToL1Tracking = () => {
  return useTracking(track, [...Object.values(TrackEventType.TRANSFER.TRANSFER_TO_L1)]);
};

export const useTransferToL2Tracking = () => {
  return useTracking(track, [...Object.values(TrackEventType.TRANSFER.TRANSFER_TO_L2)]);
};

export const useCompleteTransferToL1Tracking = () => {
  return useTracking(track, [...Object.values(TrackEventType.TRANSFER.COMPLETE_TRANSFER_TO_L1)]);
};

export const useAccountTracking = () => {
  return useTracking(track, [...Object.values(TrackEventType.ACCOUNT)]);
};

export const useSelectTokenTracking = () => {
  return useTracking(track, [...Object.values(TrackEventType.SELECT_TOKEN)]);
};

export const useConnectWalletTracking = () => {
  return useTracking(track, [
    TrackEventType.CONNECT_WALLET_CLICK,
    TrackEventType.CONNECT_ETHEREUM_WALLET_CLICK,
    TrackEventType.CONNECT_STARKNET_WALLET_CLICK
  ]);
};

export const useFaqTracking = () => {
  return useTracking(track, TrackEventType.FAQ_SCREEN);
};

export const useDiscordTabTracking = () => {
  return useTracking(track, TrackEventType.DISCORD_TAB_CLICK);
};
