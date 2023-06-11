import {translations} from '@config/translations';
import {chainPath, useTranslation} from '@starkware-webapps/ui';

export const useContainersTranslation = path => {
  return useTranslation(chainPath('containers', path), translations);
};

export const useHeaderTranslation = path => {
  return useContainersTranslation(chainPath('header', path));
};

export const useFooterTranslation = () => {
  return useContainersTranslation('footer');
};

export const useMenusTranslation = path => {
  return useTranslation(chainPath('menus', path), translations);
};

export const useAccountTranslation = path => {
  return useMenusTranslation(chainPath('account', path));
};

export const useSelectTokenTranslation = path => {
  return useMenusTranslation(chainPath('selectToken', path));
};

export const useTransferTranslation = path => {
  return useMenusTranslation(chainPath('transfer', path));
};

export const useSourceTranslation = path => {
  return useMenusTranslation(chainPath('source', path));
};

export const useProvidersTranslation = path => {
  return useMenusTranslation(chainPath('providers', path));
};

export const useToastsTranslation = path => {
  return useTranslation(chainPath('toasts', path), translations);
};

export const useCompleteTransferToastTranslation = () => {
  return useToastsTranslation('completeTransfer');
};

export const usePendingTransferToastTranslation = () => {
  return useToastsTranslation('pendingTransfer');
};

export const useModalsTranslation = path => {
  return useTranslation(chainPath('modals', path), translations);
};

export const useLoginTranslation = path => {
  return useModalsTranslation(chainPath('login', path));
};

export const useTransferProgressModalTranslation = () => {
  return useModalsTranslation('transferProgress');
};

export const useTransactionSubmittedModalTranslation = () => {
  return useModalsTranslation('transactionSubmitted');
};

export const useUnsupportedModalTranslation = () => {
  return useModalsTranslation('unsupported');
};

export const useProgressModalTranslation = () => {
  return useModalsTranslation('progress');
};

export const useOnboardingModalTranslation = () => {
  return useModalsTranslation('onboarding');
};

export const useBlockedAddressModalTranslation = () => {
  return useModalsTranslation('blockedAddress');
};

export const useScreensTranslation = path => {
  return useTranslation(chainPath('screens', path), translations);
};

export const useFaqTranslation = () => {
  return useScreensTranslation('faq');
};

export const useTermsTranslation = () => {
  return useScreensTranslation('terms');
};

export const useTransferLogContainerTranslation = () => {
  return useAccountTranslation('transferLogContainer');
};

export const useTransferLogTranslation = () => {
  return useAccountTranslation('transferLogContainer.transferLog');
};

export const useTabsTranslation = () => {
  return useHeaderTranslation('tabs');
};
