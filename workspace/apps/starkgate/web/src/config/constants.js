// Values
export const HIDE_ELEMENT_COOKIE_DURATION_DAYS = 1;
export const TELEPORT_FEE_MULTIPLIER = 0.0001;
export const MONITOR_ATTESTATIONS_INTERVAL = 5000;
export const GET_TRANSFERS_MAX_RETRY = 3;
export const GET_TRANSFERS_REFETCH_INTERVAL = 1000 * 60; // 60 seconds
export const GET_PENDING_WITHDRAWALS_REFETCH_INTERVAL = 1000 * 60 * 3; // 3 minutes
export const FETCH_TOKEN_BALANCE_MAX_RETRY = 5;

// Strings
export const ETHERSCAN = 'Etherscan';
export const VOYAGER = 'Voyager';
export const STARKSCAN = 'StarkScan';
export const BLOCK_EXPLORER_STORAGE_KEY = 'sg_l2_block_explorer';
export const APPROVE_AMOUNT = (2n ** 96n - 1n).toString();

// URLs
export const DISCORD_LINK_URL = 'https://starknet.io/discord';
export const STARKWARE_SITE_URL = 'https://starkware.co/';
export const STARKNET_SITE_URL = 'https://starknet.io/en/legal-disclaimers';
export const STARKNET_PRIVACY_POLICY_URL = `${STARKNET_SITE_URL}#toc-privacy-policy`;
export const STARKNET_TERMS_URL = `${STARKNET_SITE_URL}#toc-terms-and-conditions`;
export const STARKNET_DOCS_URL = 'https://docs.starknet.io/documentation/architecture_and_concepts';
export const CONTACT_US_LINK_URL =
  'https://forms.reform.app/starkware/starkgate-issue-report/er0zta';
export const STARKGATE_DOCS_URL = `${STARKNET_DOCS_URL}/L1-L2_Communication/token-bridge`;
export const STARKGATE_MAIL_ADDRESS = 'starkgate@starknet.io';
export const STARKNET_ADDRESSES_REPO_URL = 'https://github.com/starkware-libs/starknet-addresses';
export const STARKGATE_FRONTEND_REPO_URL = 'https://github.com/starkware-libs/starkgate-frontend';
export const STARKGATE_CONTRACTS_REPO_URL =
  'https://github.com/starkware-libs/starkgate-contracts/tree/main/src/starkware/starknet/apps/starkgate';
export const FEEDBACK_FORM_URL_GOERLI =
  'https://forms.reform.app/starkware/StarkGate_Feedback/yhyalh';
export const FEEDBACK_FORM_URL_MAINNET =
  'https://forms.reform.app/TeRuSp/StarkGate-Feedback-Mainnet/bcoscx';
export const APP_URL_GOERLI = 'https://goerli.starkgate.starknet.io';
export const APP_URL_MAINNET = 'https://starkgate.starknet.io';
export const STARKNET_ECOSYSTEM_URL = 'https://starknet-ecosystem.com';
export const MAKER_TELEPORT_LEARN_MORE_URL =
  'https://forum.makerdao.com/t/signal-request-launch-maker-teleport-with-1-basis-point-fee/15109';
export const AUTO_WITHDRAWAL_READ_MORE_URL =
  'https://medium.com/@0xSpaceShard/starkgate-1-click-withdrawal-5e96e5dc152c';
