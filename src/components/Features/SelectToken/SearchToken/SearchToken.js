import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {ReactComponent as SearchIcon} from '../../../../assets/svg/icons/search.svg';
import {Input} from '../../../UI';
import styles from './SearchToken.module.scss';
import {SEARCH_PLACEHOLDER} from './SearchToken.strings';

export const SearchToken = ({tokens, onSearchResults}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = tokens.filter(token => token.name.toLowerCase().includes(searchTerm));
    onSearchResults(results);
  }, [searchTerm]);

  return (
    <div className={styles.searchToken}>
      <SearchIcon />
      <Input
        placeholder={SEARCH_PLACEHOLDER}
        style={{fontSize: '20px', width: '100%'}}
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

SearchToken.propTypes = {
  tokens: PropTypes.array,
  onSearchResults: PropTypes.func
};
