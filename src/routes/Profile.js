import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, dbService } from '../fbase';
import { collection, getDocs, query, where } from '@firebase/firestore';
const Profile = ({ userObj }) => {
  const history = useNavigate();
  const onLogOut = () => {
    auth.signOut();
    history(-1);
  };
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, 'wteers'),
      where('creatorId', '==', userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <div>
      <button onClick={onLogOut}>log out</button>
    </div>
  );
};

export default Profile;
