import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import '../Login.css';
import { useNavigate } from 'react-router-dom';
import { mockAuthenticate } from '../mocks/mockAuth';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    mockAuthenticate({ username: 'testuser', password: 'password123' })
      .then((jwt) => {
        console.log('Received JWT:', jwt);
        document.cookie = `jwt=${jwt}; Secure; HttpOnly; SameSite=Strict; path=/`;
        login({ username: username, role: 'customer' });
      })
      .catch((error) => {
        console.error('Authentication failed:', error);
      });

    navigate('/chat');
  };

  const responseGoogle = () => {
    console.log('Google login error');
  };

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    console.log(response);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <div className="social-login">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              responseGoogle();
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />

          <FacebookLogin
            buttonStyle={{ padding: '6px', color: 'blue' }}
            appId="946726573608245"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
