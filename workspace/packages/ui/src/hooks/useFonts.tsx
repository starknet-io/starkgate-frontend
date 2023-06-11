import {useMemo} from 'react';

import defaultFonts from '@styles/_fonts.module.scss';

type Fonts = {
  [name: string]: string;
};

export const useFonts = (fonts: Fonts = {}) => useMemo(() => ({...defaultFonts, ...fonts}), []);
