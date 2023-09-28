import React from 'react';
import Search from '../Search/Search';
import SearchItem from '../SearchItem/SearchItem';
import Favorites from '../Favorites/Favorites'

function App(props) {
  return (
    <div>
      <h1>Giphy Search!</h1>
      <Search/>
      <Favorites/>
    </div>
  );
}

export default App;
