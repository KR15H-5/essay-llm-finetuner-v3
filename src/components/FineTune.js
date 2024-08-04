import React, { useState } from 'react';

const FineTune = ({ user }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const SUPABASE_URL = 'https://qbhmbdwocbvnhsampfmm.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiaG1iZHdvY2J2bmhzYW1wZm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMjM4NzIsImV4cCI6MjAzNjY5OTg3Mn0.-bF1bcBAkawL5eXeN5gjJuP4FdAqL4W2Cvtk4_g2aSE';

  const fineTune = async () => {
    const essay = { userid: user.email, prompt, content: response };
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
        alert('Error storing data');
      }
    } catch (error) {
      console.error(error);
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
