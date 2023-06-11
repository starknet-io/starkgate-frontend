import {useMemo} from 'react';

type Envs = {
  [name: string]: string;
};

export const useEnvs = (envs: Envs) => useMemo(() => envs, []);
