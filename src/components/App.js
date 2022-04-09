import React, { useState } from 'react';
import Router from './Router';
import { auth } from '../fbase';
import { useEffect } from 'react';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setInit(true);
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
      {init ? <Router isLoggedIn={isLoggedIn} /> : 'Initlizing...'}
      <footer>@Twitter{new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
