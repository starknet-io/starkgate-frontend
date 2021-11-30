import {evaluate} from '../../../../utils';

export const BODY_TXT = walletName =>
  evaluate('Waiting for confirmation from {{walletName}}', {walletName});
