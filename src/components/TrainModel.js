import React, { useState } from 'react';

const TrainModel = () => {
    const [userId, setUserId] = useState('');

    const BACKEND_URL = 'https://essay-llm-finetuner.onrender.com';

    const train = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/fine-tune`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ value: parseInt(userId) })
            });
            if (res.ok) {
                alert(`Model fine-tuned successfully for user ID ${userId}.`);
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
            <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
            <button onClick={train}>Train</button>
        </div>
    );
};

export default TrainModel;
