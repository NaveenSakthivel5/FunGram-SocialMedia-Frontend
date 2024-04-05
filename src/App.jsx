import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Addpost from './pages/Addpost';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPosts } from "./redux/actions/postActions"
import { getAllUsers } from './redux/actions/userActions';
import AllUsers from './pages/AllUsers';
import Editprofile from './pages/Editprofile';

function App() {
  const { loading, likeOrUnlikeLoading } = useSelector((state) => state.alertsReducer);

  const dispatch  = useDispatch()
  useEffect(() => {
    dispatch(getAllPosts)
    dispatch(getAllUsers)
  },[])

  return (
    <div className='App'>

      { (loading || likeOrUnlikeLoading) && (
        <div className="spinner-border" role="status" style={{ borderWidth: 5 }}>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path='/profile/:userid' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/addpost' element={<ProtectedRoute><Addpost /></ProtectedRoute>} />
          <Route path='/allusers' element={<ProtectedRoute><AllUsers /></ProtectedRoute>} />
          <Route path='/editprofile' element={<ProtectedRoute><Editprofile /></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("user");

  return isAuthenticated ? (
     children
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;
