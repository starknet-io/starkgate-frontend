import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';

import {useEnvs} from '../../hooks';
import {getStarknet} from '../../libs';
import {promiseHandler} from '../../utils';
import {BlockHashContext} from './block-hash-context';

export const BlockHashProvider = ({children}) => {
  const {pollBlockNumberInterval} = useEnvs();
  const [blockHash, setBlockHash] = useState();

  const fetchBlockHash = useCallback(async () => {
    const [response] = await promiseHandler(getStarknet().provider.getBlock());
    if (response) {
      setBlockHash(response.block_hash);
    }
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
