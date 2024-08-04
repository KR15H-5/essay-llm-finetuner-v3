import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const clientId = '1043880223216-k92ss4hbqh0gf410efmuu1o45crqnsh5.apps.googleusercontent.com';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    // Extract user information from credentialResponse
    const userData = {
      name: credentialResponse.profileObj.name,
      email: credentialResponse.profileObj.email,
      token: credentialResponse.tokenId
    };
    onLogin(userData);
    navigate('/main'); // Navigate to the main page after successful login
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
