import {useMemo} from 'react';

import fonts from '../styles/fonts.module.scss';

export const useFonts = () => useMemo(() => fonts, []);
