import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { Text } from "react-native";
import axios from "axios";
import { BASE_URL } from "@env";
import style from "./style";

const SearchComp = ({ onSearchResultsChange, onCancel }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const onSubmitSearch = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/recipe/searchRecipes?name=${searchQuery}`
      );

      const results = response.data;
      setSearchResults(results);
      onSearchResultsChange(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      onSearchResultsChange(searchResults);
    }
  }, [searchResults, onSearchResultsChange]);

  const handleCancel = () => {
    setSearchQuery("");
    onCancel();
  };
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={style.search}
        onSubmitEditing={onSubmitSearch}
        onIconPress={handleCancel}
      />
      {Array.isArray(searchResults) &&
        searchResults.map((result) => (
          <Text key={result.id}>{result.name}</Text>
        ))}
    </>
  );
};

export default SearchComp;
