import {useMemo} from 'react';

import defaultColors from '@styles/_colors.module.scss';

type Colors = {
  [name: string]: string;
};

export const useColors = (colors: Colors = {}) =>
  useMemo(
    () => ({
      ...defaultColors,
      ...colors
    }),
    []
  );
