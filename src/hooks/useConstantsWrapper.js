import {useConstants} from '@starkware-industries/commons-js-hooks';

import * as constants from '../config/constants';

export const useConstantsWrapper = () => useConstants(constants);
