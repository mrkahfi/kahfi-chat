import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import '../Login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Handle username/password login logic here
    console.log('Username:', username);
    console.log('Password:', password);

    navigate('/chat');
  };

  const responseGoogle = () => {
    // Handle Google login response
    console.log('Google login error');
  };

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    // Handle Facebook login response
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
          \
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
