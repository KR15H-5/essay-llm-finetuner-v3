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
    backgroundColor: '#9b59b6',
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
    backgroundColor: '#8e44ad',
    boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
    transform: 'translateY(-2px)',
  },
  spinner: {
    border: '2px solid #ffffff',
    borderTop: '2px solid #9b59b6',
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

const FineTune = ({ user }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
  const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

  const fineTune = async () => {
    setIsSubmitting(true);
    const essay = {
      userid: user.email,
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
        setPrompt('');
        setResponse('');
      } else {
        const errorDetails = await res.json();
        alert('Error storing data: ' + errorDetails.message);
        console.error('Error details:', errorDetails);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while storing the data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add to Knowledge Base</h2>
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <textarea
          style={styles.textarea}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt"
          rows={3}
        />
        <textarea
          style={styles.textarea}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Enter response"
          rows={5}
        />
        <button
          style={styles.button}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
          onClick={fineTune}
          disabled={isSubmitting}
        >
          {isSubmitting && <div style={styles.spinner} />}
          {isSubmitting ? 'Submitting...' : 'Add Essay'}
        </button>
      </form>
    </div>
  );
};

export default FineTune;