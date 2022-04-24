import React from 'react';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../fbase';
import AuthForm from '../components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
const Auth = () => {
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
    <div className='authContainer'>
      <AuthForm
        icon={faTwitter}
        color={'#04AAFF'}
        size='3x'
        style={{ marginBottom: 30 }}
      />
      <div className='authBtns'>
        <button onClick={onSocialClick} name='Google' className='authBtn'>
          Continue With Googie <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name='Github' className='authBtn'>
          Continue With Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
