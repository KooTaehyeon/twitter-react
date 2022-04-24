import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
const AuthForm = () => {
  const inputStyles = {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div>
      <form onSubmit={onSubmit} className='container'>
        <input
          name='email'
          type='text'
          placeholder='email'
          required
          value={email}
          onChange={onChange}
          className='authInput'
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
          className='authInput'
        />

        <input
          type={'submit'}
          value={newAccount ? 'Create Account' : 'Login'}
          className='authInput authSubmit'
        />
        <br />
        {error && <span className='authError'>{error}</span>}
      </form>
      <span onClick={toggleAccount} className='authSwitch'>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
    </div>
  );
};

export default AuthForm;
