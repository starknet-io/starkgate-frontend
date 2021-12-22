import {useMemo} from 'react';

import config from '../config/config.json';

export const useConfig = () => useMemo(() => config, []);
