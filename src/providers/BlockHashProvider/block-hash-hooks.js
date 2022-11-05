import {useContext} from 'react';

import {BlockHashContext} from './block-hash-context';

export const useBlockHash = () => useContext(BlockHashContext);
