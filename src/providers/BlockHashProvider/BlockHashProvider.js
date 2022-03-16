import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';

import {starknet} from '../../blockchain';
import {useConfig} from '../../hooks';
import {BlockHashContext} from './block-hash-context';

export const BlockHashProvider = ({children}) => {
  const {pollBlockNumberInterval} = useConfig();
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
