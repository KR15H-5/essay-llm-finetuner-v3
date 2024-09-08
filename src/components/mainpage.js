import React, { useState } from 'react';
import FineTune from './FineTune';
import TrainModel from './TrainModel';
import GenerateResult from './GenerateResult';

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: '#1a237e',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 300,
  },
  logoutButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    padding: '10px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
  content: {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  email: {
    fontSize: '18px',
    marginBottom: '30px',
    color: '#546e7a',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  sectionHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  tab: {
    padding: '10px 20px',
    margin: '0 10px',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    backgroundColor: '#e0e0e0',
    color: '#333',
  },
  activeTab: {
    backgroundColor: '#1a237e',
    color: 'white',
  },
};

const MainPage = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('fineTune');

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome, {user.name}</h1>
        <button 
          style={styles.logoutButton} 
          onClick={onLogout}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Logout
        </button>
      </header>
      <div style={styles.content}>
        <p style={styles.email}>Email: {user.email}</p>
        <div style={styles.tabs}>
          {['fineTune', 'trainModel', 'generateResult'].map((tab) => (
            <button
              key={tab}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.activeTab : {}),
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div 
          style={styles.section}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.sectionHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.section)}
        >
          {activeTab === 'fineTune' && <FineTune user={user} />}
          {activeTab === 'trainModel' && <TrainModel user={user} />}
          {activeTab === 'generateResult' && <GenerateResult user={user} />}
        </div>
      </div>
    </div>
  );
};

export default MainPage;