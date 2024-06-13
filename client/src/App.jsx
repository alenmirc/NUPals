import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './App.css';

import { UserContextProvider } from '../context/userContext';
import PrivateRoute from '../context/PrivateRoute';
import PublicRoute from '../context/PublicRoute';
import AdminPublicRoute from '../context/AdminPublicRoute';
import AdminPrivateRoute from '../context/AdminPrivateRoute';
  
import Notfound from './pages/404Notfound/404';

import Home from './pages/Home/Home';
import Message from './pages/Message/Message';
import Profile from './pages/Profile/Profile';
import Editprofile from './pages/Profile/Editprofile/Editprofile';
import Notification from './pages/Notification/Notification';
import Register from './pages/Register';
import Login from './pages/Login';
import FindPal from './pages/FindPal/FindPal';

import Dashboard from './admin/pages/Dashboard/Dashboard';
import Users from './admin/pages/Users/Users';
import Post from './admin/pages/Post/Post';
import AdminLogin from './admin/pages/Login/Login';

import Test from './admin/components/Sidebar/Sidebar';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true


function App() {
  return (
    <>
    <UserContextProvider>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
      <Route path='*' element={<Notfound />} />

      <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
       <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
       <Route path='/hometest' element={<Home />} />
        <Route path='/message' element={<PrivateRoute><Message /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/notification' element={<PrivateRoute><Notification /></PrivateRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/editprofile' element={<PrivateRoute><Editprofile /></PrivateRoute>} />
        <Route path='/findpal' element={<FindPal />} />


        <Route path='/admin/' element={<AdminPrivateRoute><Dashboard /></AdminPrivateRoute>} />
        <Route path='/admin/dashboard' element={<AdminPrivateRoute><Dashboard /></AdminPrivateRoute>} />
        <Route path='/admin/login' element={<AdminPublicRoute><AdminLogin /></AdminPublicRoute>} />
        <Route path='/admin/users' element={<AdminPrivateRoute><Users /></AdminPrivateRoute>} />
        <Route path='/admin/post' element={<AdminPrivateRoute><Post /></AdminPrivateRoute>} />

        <Route path='/test/test' element={<Test />} />
      </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
