import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../fbase';

const Profile = () => {
  const history = useNavigate();
  const onLogOut = () => {
    auth.signOut();
    history(-1);
  };
  return (
    <div>
      <button onClick={onLogOut}>log out</button>
    </div>
  );
};

export default Profile;
