import {useConstantsGeneric} from '@starkware-industries/commons-js-hooks';

import * as constants from '../config/constants';

export const useConstants = () => useConstantsGeneric(constants);
