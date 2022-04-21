import {useMemo} from 'react';

import envs from '../config/envs.js';

export const useEnvs = () => useMemo(() => envs, []);
