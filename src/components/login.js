import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const clientId = '1043880223216-k92ss4hbqh0gf410efmuu1o45crqnsh5.apps.googleusercontent.com';

const Login = ({ onLogin }) => {
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
