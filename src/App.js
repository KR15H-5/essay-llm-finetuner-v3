import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './components/mainpage';
import Login from './components/login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/main" /> : <Login onLogin={handleLogin} />} />
          <Route path="/main" element={isAuthenticated ? <MainPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/main" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
