import React, { useState } from 'react';
import Router from './Router';
import { auth } from '../fbase';
import { useEffect } from 'react';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // 렌더링만을 위한 state(changeName)입니다
  const [changeName, setChangeName] = useState(false);
  const refresUser = () => setChangeName((prev) => !prev);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
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
        <Router
          isLoggedIn={Boolean(userObj)}
          refresUser={refresUser}
          userObj={userObj}
        />
      ) : (
        'Initlizing...'
      )}
    </div>
  );
}

export default App;
