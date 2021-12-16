import {evaluate} from '../../../../utils';

export const TITLE_TXT = 'Login';

export const SUBTITLE_TXT = networkName =>
  evaluate('Please select {{networkName}} wallet to connect with this dApp:', {
    networkName
  });

export const DOWNLOAD_TEXT = ['Don’t have a wallet?', 'Download Here'];

export const MODAL_TXT = walletName =>
  evaluate('Waiting for confirmation from {{walletName}}', {walletName});
