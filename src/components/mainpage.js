import React from 'react';
import FineTune from './FineTune';
import TrainModel from './TrainModel';
import GenerateResult from './GenerateResult';

const MainPage = ({ user, onLogout }) => {
  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
        <h1>Welcome, {user.name}</h1>
        <button onClick={onLogout}>Logout</button>
      </header>
      <div style={{ padding: '20px' }}>
        <p>Email: {user.email}</p>
        <FineTune user={user} />
        <TrainModel user={user} />
        <GenerateResult user={user} />
      </div>
    </div>
  );
};

export default MainPage;
