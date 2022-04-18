import {useMemo} from 'react';

import utils from '../utils';

export const useTranslation = path => useMemo(() => utils.getTranslation(path), [path]);

export const useConstitutiveTranslation = (basePath, path) => {
  if (path) {
    basePath = `${basePath}.${path}`;
  }
  return useTranslation(basePath);
};

export const useHeaderTranslation = () => {
  return useTranslation('containers.header');
};

export const useFooterTranslation = () => {
  return useTranslation('containers.footer');
};

export const useAccountTranslation = path => {
  return useConstitutiveTranslation('menus.account', path);
};

export const useSelectTokenTranslation = () => {
  return useTranslation('menus.selectToken');
};

export const useTransferTranslation = () => {
  return useTranslation('menus.transfer');
};

export const useLoginTranslation = () => {
  return useTranslation('menus.login');
};

export const useToastsTranslation = path => {
  return useConstitutiveTranslation('toasts', path);
};

export const useCompleteTransferToastTranslation = () => {
  return useConstitutiveTranslation('completeTransfer');
};

export const usePendingTransferToastTranslation = () => {
  return useConstitutiveTranslation('pendingTransfer');
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

export const useFaqTranslation = () => {
  return useTranslation('screens.faq');
};

export const useTermsTranslation = () => {
  return useTranslation('screens.terms');
};

export const useTransferLogContainerTranslation = () => {
  return useAccountTranslation('transferLogContainer');
};

export const useTransferLogTranslation = () => {
  return useAccountTranslation('transferLogContainer.transferLog');
};
