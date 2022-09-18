import {useEnvs} from '@starkware-industries/commons-js-hooks';

import * as envs from '../config/envs.js';

export const useEnvsWrapper = () => useEnvs(envs);
