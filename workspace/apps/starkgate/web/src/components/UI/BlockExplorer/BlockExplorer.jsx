import React from 'react';

import {blockExplorers as blockExplorersMap} from '@config/block-explorers';
import {NetworkType} from '@starkware-webapps/enums';

import {BlockExplorerButton} from './BlockExplorerButton';
import {BlockExplorerPropTypes} from './BlockExplorerPropTypes';
import {BlockExplorerSelect} from './BlockExplorerSelect/BlockExplorerSelect';

export const BlockExplorer = props => {
  const layerBlockExplorers = blockExplorersMap[props.isL1 ? NetworkType.L1 : NetworkType.L2];
  const blockExplorers = Object.values(layerBlockExplorers);
  if (blockExplorers.length === 1) {
    return <BlockExplorerButton blockExplorer={blockExplorers[0]} {...props} />;
  } else if (blockExplorers.length > 1) {
    return <BlockExplorerSelect blockExplorers={layerBlockExplorers} {...props} />;
  }
};

BlockExplorer.propTypes = BlockExplorerPropTypes;
