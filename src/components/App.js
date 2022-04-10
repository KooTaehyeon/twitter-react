import React, { useState } from 'react';
import Router from './Router';
import { auth } from '../fbase';
import { useEffect } from 'react';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
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
        <Router isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        'Initlizing...'
      )}
    </div>
  );
}

export default App;
