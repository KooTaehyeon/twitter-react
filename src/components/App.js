import React, { useState } from 'react';
import Router from './Router';
import { auth } from '../fbase';
import { useEffect } from 'react';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  // setInterval(() => {
  //   console.log(auth.currentUser);
  // }, 10000);
  return (
    <div className='App'>
      {init ? (
        <Router isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        'Initlizing...'
      )}
      <footer>@Twitter{new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
