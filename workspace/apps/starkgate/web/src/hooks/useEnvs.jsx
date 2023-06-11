import * as envs from '@config/envs';
import {useEnvs as useEnvsGeneric} from '@starkware-webapps/ui';

export const useEnvs = () => useEnvsGeneric(envs);
