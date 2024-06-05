import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './App.css';

import { UserContextProvider } from '../context/userContext';
import PrivateRoute from '../context/PrivateRoute';

import Home from './pages/Home/Home';
import Message from './pages/Message';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true


function App() {
  return (
    <>
    <UserContextProvider>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
       <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
       <Route path='/hometest' element={<Home />} />
        <Route path='/message' element={<Message />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
