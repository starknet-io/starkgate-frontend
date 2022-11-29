import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {ReactComponent as SearchIcon} from '../../../assets/svg/icons/search.svg';
import {useColors, useSelectTokenTranslation} from '../../../hooks';
import {Input} from '../index';
import styles from './SearchToken.module.scss';

export const SearchToken = ({tokens, onSearchResults}) => {
  const {searchPlaceholder} = useSelectTokenTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const {colorLightSteelBlue} = useColors();

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const searchTermValue = searchTerm.toLowerCase();

    const results = tokens.filter(token => {
      const {name, symbol} = token;
      return (
        name.toLowerCase().includes(searchTermValue) ||
        symbol.toLowerCase().includes(searchTermValue)
      );
    });
    onSearchResults(results);
  }, [searchTerm]);

  return (
    <div className={styles.searchToken}>
      <SearchIcon />
      <Input
        placeholder={searchPlaceholder}
        placeholderColor={colorLightSteelBlue}
        style={{fontWeight: 400, fontSize: '14px', lineHeight: '20px', width: '100%'}}
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
