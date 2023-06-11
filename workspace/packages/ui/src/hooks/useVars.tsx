import {useMemo} from 'react';

import defaultVars from '@styles/_vars.module.scss';

type Vars = {
  [name: string]: string;
};

export const useVars = (vars: Vars = {}) => useMemo(() => ({...defaultVars, ...vars}), []);
