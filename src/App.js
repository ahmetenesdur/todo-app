import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import Todos from './components/Todos/index';
import Login from './components/Login/Login';

function App() {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('token')) || '');

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token])

  if (token === '') {
    return <Login setToken={setToken} token={token} />
  }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Todos token={token} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
