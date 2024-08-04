import React, { useState } from 'react';

const FineTune = ({ user }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const SUPABASE_URL = 'https://qbhmbdwocbvnhsampfmm.supabase.co';
  const SUPABASE_KEY = 'YOUR_SUPABASE_KEY';

  const fineTune = async () => {
    const essay = {
      userid: user.email,   // Using user.email from the login data
      prompt: prompt,
      content: response
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/essay-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify(essay)
      });

      if (res.ok) {
        alert('Data stored successfully');
      } else {
        const errorDetails = await res.json();
        alert('Error storing data: ' + errorDetails.message);
        console.error('Error details:', errorDetails);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div>
      <h2>Add to Knowledge Base</h2>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Prompt" />
      <textarea value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Response"></textarea>
      <button onClick={fineTune}>Add Essay</button>
    </div>
  );
};

export default FineTune;
