import * as constants from '@config/constants';
import {useConstants as useConstantsGeneric} from '@starkware-webapps/ui';

export const useConstants = () => useConstantsGeneric(constants);
