import {useMemo} from 'react';

import vars from '../styles/variables.module.scss';

export const useVars = () => useMemo(() => vars, []);
