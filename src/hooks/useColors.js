import {useMemo} from 'react';

import colors from '../styles/colors.module.scss';

export const useColors = () => useMemo(() => colors, []);
