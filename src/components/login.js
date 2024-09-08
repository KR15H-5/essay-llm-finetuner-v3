import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const clientId = '1043880223216-k92ss4hbqh0gf410efmuu1o45crqnsh5.apps.googleusercontent.com';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #6D28D9, #2563EB)',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#111827',
  },
  description: {
    fontSize: '0.875rem',
    color: '#6B7280',
    marginBottom: '1.5rem',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: 'white',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonHover: {
    backgroundColor: '#F3F4F6',
  },
  buttonText: {
    marginLeft: '0.5rem',
  },
  note: {
    fontSize: '0.75rem',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: '1rem',
  },
};

const Login = ({ onLogin }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    if (credentialResponse && credentialResponse.credential) {
      const jwtToken = credentialResponse.credential;
      const base64Url = jwtToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const profileObj = JSON.parse(jsonPayload);

      // Safeguard: Ensure that the profile object contains the necessary information
      if (profileObj.email) {
        const userData = {
          name: profileObj.name,
          email: profileObj.email,
          token: jwtToken
        };

        onLogin(userData);
        navigate('/main'); // Navigate to the main page after successful login
      } else {
        console.error('Email not found in the profile object.');
      }
    } else {
      console.error('Login response does not contain expected profile information.');
    }
  };

  const handleFailure = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.description}>Sign in to access your LLM fine-tuning dashboard</p>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleFailure}
            render={(renderProps) => (
              <button
                style={{
                  ...styles.button,
                  ...(isHovered ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span style={styles.buttonText}>Sign in with Google</span>
              </button>
            )}
          />
          <p style={styles.note}>Note: Currently, only Google sign-in is available.</p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
