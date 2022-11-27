import {useEnvsGeneric} from '@starkware-industries/commons-js-hooks';

import * as envs from '../config/envs.js';

export const useEnvs = () => useEnvsGeneric(envs);
