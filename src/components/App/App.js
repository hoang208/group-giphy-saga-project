import React from 'react';
import Search from '../Search/Search';
import Favorites from '../Favorites/Favorites'
import { HashRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

function App(props) {
  return (
    <Router>
    <div>
      <h1>Giphy Search!</h1>
      <nav className='Links'>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
      </nav>
      <Route exact path="/" >
      <Search/>
      </Route>
      <Route exact path="/favorites">
      <Favorites />
      </Route>
    </div>
    </Router>
  );
}

export default App;
