import React from 'react';

const TrainModel = ({ user }) => {
  const BACKEND_URL = 'https://essay-llm-finetuner.onrender.com';

  const train = async () => {
    try {
      // Send only the user_id (email) to the backend
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
    }
  };

  return (
    <div>
      <h2>Train the Model</h2>
      <button onClick={train}>Train</button>
    </div>
  );
};

export default TrainModel;
