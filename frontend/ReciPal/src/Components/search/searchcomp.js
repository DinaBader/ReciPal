import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { Text } from 'react-native';
import axios from 'axios';
import style from './style';

const SearchComp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const onSubmitSearch = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.100:8000/recipe/searchRecipes?name=${searchQuery}`
        );

      console.log('API Response:', response.data);
      setSearchQuery("")
      const results = response.data;
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={style.search}
        onSubmitEditing={onSubmitSearch}
      />
      {Array.isArray(searchResults) &&
        searchResults.map((result) => <Text key={result.id}>{result.name}</Text>)}
    </>
  );
};

export default SearchComp;
