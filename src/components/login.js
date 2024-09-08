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

      if (profileObj.email) {
        const userData = {
          name: profileObj.name,
          email: profileObj.email,
          token: jwtToken
        };

        onLogin(userData);
        navigate('/main');
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
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src="/api/placeholder/48/48" alt="Your Company Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                    useOneTap
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;