import React, { useState } from 'react';

const TrainModel = ({ user }) => {
  const [modelId, setModelId] = useState('');

  const BACKEND_URL = 'https://essay-llm-finetuner.onrender.com';

  const train = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/fine-tune`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.email, model_id: modelId })
      });
      if (res.ok) {
        alert(`Model fine-tuned successfully for user ${user.email}.`);
      } else {
        alert('Error fine-tuning the model.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Train the Model</h2>
      <input
        type="text"
        value={modelId}
        onChange={(e) => setModelId(e.target.value)}
        placeholder="Model ID"
      />
      <button onClick={train}>Train</button>
    </div>
  );
};

export default TrainModel;
