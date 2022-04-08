import React, { useState } from 'react';
import Router from './Router';
import { auth } from '../fbase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

  return (
    <div className='App'>
      <Router isLoggedIn={isLoggedIn} />
      <footer>@Twitter{new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
