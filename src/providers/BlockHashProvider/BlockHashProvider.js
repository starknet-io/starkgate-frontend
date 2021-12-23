import {getStarknet} from '@argent/get-starknet';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';

import {useConfig} from '../../hooks';
import {BlockHashContext} from './block-hash-context';

export const BlockHashProvider = ({children}) => {
  const {pollBlockNumberInterval} = useConfig();
  const [blockHash, setBlockHash] = useState();

  const fetchBlockHash = useCallback(async () => {
    const {block_hash} = await getStarknet().provider.getBlock();
    setBlockHash(block_hash);
  }, [getStarknet().provider]);

  useEffect(() => {
    fetchBlockHash();
    const intervalId = setInterval(() => {
      fetchBlockHash();
    }, pollBlockNumberInterval);
    return () => clearInterval(intervalId);
  }, [fetchBlockHash]);

  return <BlockHashContext.Provider value={blockHash}>{children}</BlockHashContext.Provider>;
};

BlockHashProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
