import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './App.css';

import { UserContextProvider } from '../context/userContext';
import PrivateRoute from '../context/PrivateRoute';
import PublicRoute from '../context/PublicRoute';

import Home from './pages/Home/Home';
import Message from './pages/Message/Message';
import Profile from './pages/Profile/Profile';
import Editprofile from './pages/Profile/Editprofile/Editprofile';
import Notification from './pages/Notification/Notification';
import Register from './pages/Register';
import Login from './pages/Login';

import Dashboard from './admin/pages/Dashboard';
import Users from './admin/pages/Users';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true


function App() {
  return (
    <>
    <UserContextProvider>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
      <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
       <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
       <Route path='/hometest' element={<Home />} />
        <Route path='/message' element={<PrivateRoute><Message /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/notification' element={<PrivateRoute><Notification /></PrivateRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/editprofile' element={<PrivateRoute><Editprofile /></PrivateRoute>} />

        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/users' element={<Users />} />
      </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
