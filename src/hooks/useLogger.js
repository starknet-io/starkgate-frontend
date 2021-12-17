import {useMemo} from 'react';

import {getLogger} from '../services';

export const useLogger = name => useMemo(() => getLogger(name), [name]);
