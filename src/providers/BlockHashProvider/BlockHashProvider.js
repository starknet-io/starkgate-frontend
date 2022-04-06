import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';

import {useEnvs} from '../../hooks';
import {starknet} from '../../libs';
import {BlockHashContext} from './block-hash-context';

export const BlockHashProvider = ({children}) => {
  const {pollBlockNumberInterval} = useEnvs();
  const [blockHash, setBlockHash] = useState();

  const fetchBlockHash = useCallback(async () => {
    const {block_hash} = await starknet.defaultProvider.getBlock();
    setBlockHash(block_hash);
  }, []);

  useEffect(() => {
    fetchBlockHash();
    const intervalId = setInterval(() => {
      fetchBlockHash();
    }, pollBlockNumberInterval);
    return () => clearInterval(intervalId);
  }, [fetchBlockHash, pollBlockNumberInterval]);

  return <BlockHashContext.Provider value={blockHash}>{children}</BlockHashContext.Provider>;
};

BlockHashProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
