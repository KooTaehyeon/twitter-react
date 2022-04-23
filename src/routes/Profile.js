import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, dbService } from '../fbase';
import { updateProfile } from '@firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
const Profile = ({ userObj }) => {
  const history = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

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
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
    }
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <Form onSubmit={onSubmit}>
        <input
          type={'text'}
          placeholder='Dispaly name'
          onChange={onChange}
          value={newDisplayName}
        />
        <input type={'submit'} value='update Prifule' />
      </Form>
      <button onClick={onLogOut}>log out</button>
    </>
  );
};
const Form = styled.form``;

export default Profile;
