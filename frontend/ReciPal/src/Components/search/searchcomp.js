import * as React from 'react';
import { Searchbar,Provider as PaperProvider } from 'react-native-paper';
import style from "./style"
const searchcomp = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={style.search}
    />
  );
};

export default searchcomp;
