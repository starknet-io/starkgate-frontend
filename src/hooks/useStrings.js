import {useMemo} from 'react';

import strings from '../config/strings.json';

export const useStrings = () => useMemo(() => strings, []);
