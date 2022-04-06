import {useMemo} from 'react';

import config from '../config/envs.js';

export const useEnvs = () => useMemo(() => config, []);
