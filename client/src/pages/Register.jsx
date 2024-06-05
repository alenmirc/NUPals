import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    });
  
    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      const { firstName, lastName, email, password, confirmPassword, agreeTerms } = data;
  
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
  
      if (!agreeTerms) {
        toast.error('Please agree to the terms and conditions');
        return;
      }
  
      try {
        const { data } = await axios.post('/register', {
          firstName, lastName, email, password
        });
  
        if (data.error) {
          toast.error(data.error);
        } else {
          setData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeTerms: false
          });
          toast.success('Account created successfully!');
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
      }
    };
  
  return (
    <>
      <div className="container">
        <div className="container-form">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <p>Please fill in the inputs below:</p>

            <div className="inputRow">
  <div className="inputColumn">
    <div className="inputBox">
      <AiOutlineUser className='fullName'/>
      <input
        type='text'
        name="firstName"
        value={data.firstName}
        onChange={handleChange}
        placeholder='First Name'
        required
      />
    </div>
  </div>
  <div className="inputColumn">
    <div className="inputBox">

      <input
        type='text'
        name="lastName"
        value={data.lastName}
        onChange={handleChange}
        placeholder='Last Name'
        required
      />
    </div>
  </div>
</div>


            <div className="inputBox">
              <FiMail className='mail'/>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder='Email'
                required
              />
            </div>

            <div className="inputBox">
              <RiLockPasswordLine className='password'/>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder='Password'
                required
              />
            </div>


            <div className="inputBox">
            <RiLockPasswordLine className="password" />
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="termsBox">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={data.agreeTerms}
              onChange={() =>
                setData({ ...data, agreeTerms: !data.agreeTerms })
              }
              required
            />
            <label htmlFor="agreeTerms">I agree to the <Link to="/login"><span>terms and conditions</span></Link></label>
          </div>

          <div className="divBtn">
            <button className="loginBtn">SIGN UP</button>
          </div>
        </form>


          <div className='dont'>
            <p>Already have an account? <Link to="/login"><span>Sign in</span></Link></p>
          </div>
        </div>
      </div>
    </>
  );
}
