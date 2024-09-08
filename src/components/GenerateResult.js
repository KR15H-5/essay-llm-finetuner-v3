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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  textarea: {
    width: '100%',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #bdc3c7',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'border-color 0.3s ease',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    alignSelf: 'flex-start',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
    boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
    transform: 'translateY(-2px)',
  },
  result: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#ecf0f1',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  },
  spinner: {
    border: '2px solid #ffffff',
    borderTop: '2px solid #3498db',
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

const GenerateResult = ({ user }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const BACKEND_URL = 'https://essay-llm-finetuner.onrender.com';

  const getResult = async () => {
    setIsGenerating(true);
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
      setGeneratedText('An error occurred while generating the result.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Generate Result</h2>
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <textarea
          style={styles.textarea}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          rows={4}
        ></textarea>
        <button
          style={styles.button}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
          onClick={getResult}
          disabled={isGenerating}
        >
          {isGenerating && <div style={styles.spinner} />}
          {isGenerating ? 'Generating...' : 'Generate Result'}
        </button>
      </form>
      {generatedText && (
        <div style={styles.result}>
          <h3>Generated Result:</h3>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateResult;