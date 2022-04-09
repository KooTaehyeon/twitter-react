import { async } from '@firebase/util';
import React from 'react';
import { useState } from 'react';

import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth,
} from 'firebase/auth';
import { firebaseInitialize } from '../fbase';
import { auth } from '../fbase';

const Auth = () => {
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
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === 'Google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'Github') {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(auth, provider);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='text'
          placeholder='email'
          required
          value={email}
          onChange={onChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        />

        <input
          type={'submit'}
          value={newAccount ? 'Create Account' : 'Login'}
        />
        <br />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Log in' : 'Create Account'}
      </span>
      <div>
        <button onClick={onSocialClick} name='Google'>
          Continue With Googie
        </button>
        <button onClick={onSocialClick} name='Github'>
          Continue With Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
