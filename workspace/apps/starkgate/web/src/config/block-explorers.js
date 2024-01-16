import {ReactComponent as EtherscanLogo} from '@assets/svg/etherscan.svg';
import {ReactComponent as StarkScanLogo} from '@assets/svg/starkscan.svg';
import {ReactComponent as Viewblock} from '@assets/svg/viewblock.svg';
import {ReactComponent as VoyagerLogo} from '@assets/svg/voyager.svg';
import {
  ETHERSCAN_ACCOUNT_URL,
  ETHERSCAN_TX_URL,
  STARKSCAN_ACCOUNT_URL,
  STARKSCAN_TX_URL,
  VIEWBLOCK_ACCOUNT_URL,
  VIEWBLOCK_TX_URL,
  VOYAGER_ACCOUNT_URL,
  VOYAGER_TX_URL
} from '@config/envs';
import {NetworkType} from '@starkware-webapps/enums';

export const blockExplorers = {
  [NetworkType.L1]: {
    etherscan: {
      name: 'Etherscan',
      accountUrl: ETHERSCAN_ACCOUNT_URL,
      txUrl: ETHERSCAN_TX_URL,
      Logo: EtherscanLogo
    }
  },
  [NetworkType.L2]: {
    starkscan: {
      name: 'Starkscan',
      accountUrl: STARKSCAN_ACCOUNT_URL,
      txUrl: STARKSCAN_TX_URL,
      Logo: StarkScanLogo
    },
    viewblock: {
      name: 'ViewBlock',
      accountUrl: VIEWBLOCK_ACCOUNT_URL,
      txUrl: VIEWBLOCK_TX_URL,
      Logo: Viewblock
    },
    voyager: {
      name: 'Voyager',
      accountUrl: VOYAGER_ACCOUNT_URL,
      txUrl: VOYAGER_TX_URL,
      Logo: VoyagerLogo
    }
  }
};
