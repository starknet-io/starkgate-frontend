import {useMemo} from 'react';

import utils from '../utils';

export const useTranslation = path => useMemo(() => utils.getTranslation(path), [path]);

export const useConstitutiveTranslation = (basePath, path) => {
  if (path) {
    basePath = `${basePath}.${path}`;
  }
  return useTranslation(basePath);
};

export const useContainersTranslation = path => {
  return useConstitutiveTranslation('containers', path);
};

export const useHeaderTranslation = () => {
  return useContainersTranslation('header');
};

export const useFooterTranslation = () => {
  return useContainersTranslation('footer');
};

export const useMenusTranslation = path => {
  return useConstitutiveTranslation('menus', path);
};

export const useAccountTranslation = () => {
  return useMenusTranslation('account');
};

export const useSelectTokenTranslation = () => {
  return useMenusTranslation('selectToken');
};

export const useTransferTranslation = () => {
  return useMenusTranslation('transfer');
};

export const useLoginTranslation = () => {
  return useMenusTranslation('login');
};

export const useToastsTranslation = path => {
  return useConstitutiveTranslation('toasts', path);
};

export const useCompleteTransferToastTranslation = () => {
  return useToastsTranslation('completeTransfer');
};

export const usePendingTransferToastTranslation = () => {
  return useToastsTranslation('pendingTransfer');
};

export const useModalsTranslation = path => {
  return useConstitutiveTranslation('modals', path);
};

export const useTransferProgressModalTranslation = () => {
  return useModalsTranslation('transferProgress');
};

export const useTransactionSubmittedModalTranslation = () => {
  return useModalsTranslation('transactionSubmitted');
};

export const useOnboardingModalTranslation = () => {
  return useModalsTranslation('onboarding');
};

export const useScreensTranslation = path => {
  return useConstitutiveTranslation('screens', path);
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
