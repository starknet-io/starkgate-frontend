import PropTypes from 'prop-types';
import React from 'react';

import {SelectTokenRow} from '../SelectTokenRow/SelectTokenRow';
import styles from './SelectTokenList.module.scss';

export const SelectTokenList = ({tokens, onClick}) => (
  <div className={styles.selectTokenList}>
    {tokens.map((tokenData, index) => {
      return <SelectTokenRow key={index} tokenData={tokenData} onClick={onClick} />;
    })}
  </div>
);

SelectTokenList.propTypes = {
  tokens: PropTypes.array,
  onClick: PropTypes.func
};
