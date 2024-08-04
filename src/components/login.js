import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const clientId = '1043880223216-k92ss4hbqh0gf410efmuu1o45crqnsh5.apps.googleusercontent.com';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    // Check if the profileObj exists and contains the necessary properties
    if (credentialResponse && credentialResponse.credential) {
      // Decode the JWT token to get user information
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

      // Extract user information from the decoded token
      const userData = {
        name: profileObj.name,
        email: profileObj.email,
        token: jwtToken
      };

      onLogin(userData);
      navigate('/main'); // Navigate to the main page after successful login
    } else {
      console.error('Login response does not contain expected profile information.');
    }
  };

  const handleFailure = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <h2>Login Page</h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
