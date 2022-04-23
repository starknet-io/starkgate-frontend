import {useMemo} from 'react';

import constants from '../config/constants';

export const useConstants = () => useMemo(() => constants, []);
