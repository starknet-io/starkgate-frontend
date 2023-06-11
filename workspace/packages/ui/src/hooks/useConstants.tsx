import {useMemo} from 'react';

import * as defaultConstants from '@starkware-webapps/config';

type Constants = {
  [name: string]: string | number;
};

export const useConstants = (constants?: Constants) =>
  useMemo(() => ({...defaultConstants, ...(constants || {})}), []);
