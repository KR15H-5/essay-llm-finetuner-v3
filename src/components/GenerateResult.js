import React, { useState } from 'react';

const GenerateResult = ({ user }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const BACKEND_URL = 'https://essay-llm-finetuner.onrender.com';

  const getResult = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.email, prompt })
      });
      if (res.ok) {
        const result = await res.json();
        setGeneratedText(result.generated_text);
      } else {
        setGeneratedText('Error generating the result.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Generate Result</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Prompt"
      ></textarea>
      <button onClick={getResult}>Get Result</button>
      <div>{generatedText}</div>
    </div>
  );
};

export default GenerateResult;
