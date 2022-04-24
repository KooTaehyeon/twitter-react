import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';
import Profile from '../routes/Profile';
const Router = ({ refresUser, isLoggedIn, userObj }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Home userObj={userObj} />} />
            <Route
              path='/profile'
              element={<Profile userObj={userObj} refresUser={refresUser} />}
            />
          </>
        ) : (
          <>
            <Route path='/' element={<Auth />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
