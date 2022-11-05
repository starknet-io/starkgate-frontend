import {useMemo} from 'react';

import * as constants from '../config/constants';

export const useConstants = () => useMemo(() => constants, []);
