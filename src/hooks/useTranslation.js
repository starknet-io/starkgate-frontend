import {useMemo} from 'react';

import utils from '../utils';

export const useTranslation = path => useMemo(() => utils.getTranslation(path), [path]);
