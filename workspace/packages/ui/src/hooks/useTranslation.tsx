import {useMemo} from 'react';

import {translations as componentsTranslations} from '@components';
import {translations as containersTranslations} from '@containers';
import {translations as providersTranslations} from '@providers';
import {getPropertyPath} from '@starkware-webapps/utils';

type Translations = {
  [key: string]: string | string[] | Translations;
};

export const chainPath = (basePath: string, constitutivePath: string) => {
  return constitutivePath ? `${basePath}.${constitutivePath}` : basePath;
};

export const useTranslation = (path: string, translations?: Translations) =>
  useMemo(() => {
    return getPropertyPath(
      {
        ...containersTranslations,
        ...componentsTranslations,
        ...providersTranslations,
        ...(translations || {})
      },
      path
    );
  }, [translations, path]);
