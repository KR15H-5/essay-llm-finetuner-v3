import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainPage from './components/MainPage';
import Login from './components/login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/main" /> : <Login onLogin={handleLogin} />}
          </Route>
          <Route path="/main">
            {isAuthenticated ? <MainPage user={user} onLogout={handleLogout} /> : <Redirect to="/login" />}
          </Route>
          <Redirect from="/" to={isAuthenticated ? "/main" : "/login"} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
