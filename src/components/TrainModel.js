import React, { useState } from 'react';

const styles = {
  container: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#1a237e',
    fontWeight: 500,
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonHover: {
    backgroundColor: '#45a049',
    boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
    transform: 'translateY(-2px)',
  },
  spinner: {
    border: '2px solid #ffffff',
    borderTop: '2px solid #4caf50',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    animation: 'spin 1s linear infinite',
    marginRight: '10px',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

const TrainModel = ({ user }) => {
  const [isTraining, setIsTraining] = useState(false);
  const BACKEND_URL = 'https://essay-llm-finetuner.onrender.com';

  const train = async () => {
    setIsTraining(true);
    try {
      const res = await fetch(`${BACKEND_URL}/fine-tune`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.email })
      });

      if (res.ok) {
        alert(`Model fine-tuned successfully for user ${user.email}.`);
      } else {
        const errorDetails = await res.json();
        alert('Error fine-tuning the model: ' + errorDetails.message);
        console.error('Error details:', errorDetails);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while attempting to fine-tune the model.');
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Train the Model</h2>
      <button
        style={styles.button}
        onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
        onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
        onClick={train}
        disabled={isTraining}
      >
        {isTraining && <div style={styles.spinner} />}
        {isTraining ? 'Training...' : 'Start Training'}
      </button>
    </div>
  );
};

export default TrainModel;