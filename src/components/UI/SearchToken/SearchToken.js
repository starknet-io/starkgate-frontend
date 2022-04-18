import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {ReactComponent as SearchIcon} from '../../../assets/svg/icons/search.svg';
import {useTranslation} from '../../../hooks';
import {Input} from '../index';
import styles from './SearchToken.module.scss';

export const SearchToken = ({tokens, onSearchResults}) => {
  const {searchPlaceholder} = useTranslation('menus.selectToken');
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
        placeholder={searchPlaceholder}
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
