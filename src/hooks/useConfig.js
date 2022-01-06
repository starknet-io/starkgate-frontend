import {useMemo} from 'react';

import config from '../config/config.js';

export const useConfig = () => useMemo(() => config, []);
