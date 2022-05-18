import {useMemo} from 'react';

import * as envs from '../config/envs.js';

export const useEnvs = () => useMemo(() => envs, []);
