import React, { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom"
import {FiMail} from "react-icons/fi"
import {RiLockPasswordLine} from "react-icons/ri"
import "./LoginRegister.css"
import Logo from '../assets/logo.png';

export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
      email: "",
      password: "",
    });
    

    const loginUser = async (e) => {
      e.preventDefault()
        const {email, password} = data
        try {
          const {data} = await axios.post('/login', {
            email,
            password
          })
          if(data.error) {
            toast.error(data.error)
          } else {
            setData({});
            window.location.href = '/home';
          }
        } catch (error) {
          console.error('Login failed:', error);
          toast.error('An error occurred during login. Please try again.');
        }
      };

return(

    <div className="container">
    <div className="container-form">
        <div className="logo-container">
            <img src={Logo} alt="Logo" className="logo" />
        </div>
        <form onSubmit={loginUser}>
            <h1>Welcome!</h1>
            <p>Please sign in to continue.</p>
            <div className="inputBox">
                <FiMail className='mail' />
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email} onChange={(e) => setData({...data, email: e.target.value})}
                    placeholder='Student Email'
                    required
                />
            </div>


            <div className="inputBox">
                <RiLockPasswordLine className='password' />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder='Password'
                    value={data.password} onChange={(e) => setData({...data, password: e.target.value})}
                          required
                />
            </div>
          

            <div className='divBtn'>
                <button type='submit' className='loginBtn'>LOGIN</button>
            </div>
        </form>

        <div className='dont'>
            <p>Don't have an account? <Link to="/Register"><span>Sign up</span></Link></p>
        </div>
    </div>
</div>
);
}
