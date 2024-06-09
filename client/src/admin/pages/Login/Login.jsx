import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/loginadmin', {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setEmail('');
        setPassword('');
        window.location.href = '/admin/dashboard';
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="container bootstrap snippets bootdey">
      <div className="lc-block col-md-4 col-md-offset-4 toggled" id="l-login">
        
        <form onSubmit={loginUser}>
          <p className="text-center">Welcome Admin!</p>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="clearfix"></div>
          <button type="submit" className="btn btn-block btn-primary btn-float m-t-25">
            Sign In
          </button>
          <ul className="login-navigation">
            <li data-block="#l-register" className="bg-green">
              <Link to="/Register">Register</Link>
            </li>
            <li data-block="#l-forget-password" className="bg-orange">
              Forgot Password?
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Login;
