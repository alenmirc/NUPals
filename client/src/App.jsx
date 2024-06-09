import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './App.css';

import { UserContextProvider } from '../context/userContext';
import PrivateRoute from '../context/PrivateRoute';

import Home from './pages/Home/Home';
import Message from './pages/Message/Message';
import Profile from './pages/Profile/Profile';
import Editprofile from './pages/Profile/Editprofile/Editprofile';
import Notification from './pages/Notification/Notification';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile2 from './pages/Profile';

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
        <Route path='/message' element={<PrivateRoute><Message /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/notification' element={<PrivateRoute><Notification /></PrivateRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/profile2' element={<PrivateRoute><Profile2 /></PrivateRoute>} />
        <Route path='/editprofile' element={<PrivateRoute><Editprofile /></PrivateRoute>} />
      </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
