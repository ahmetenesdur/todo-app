import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import Todos from './components/Todos/index';
import Login from './components/Login/Login';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('token')) || '');

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token])

  if (token === '') {
    return (
      <ThemeProvider>
        <Login setToken={setToken} token={token} />
      </ThemeProvider>
    )
  }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <ThemeProvider>
            <Todos token={token} />
          </ThemeProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
