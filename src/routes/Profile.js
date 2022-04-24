import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, dbService } from '../fbase';
import { updateProfile } from '@firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
const Profile = ({ userObj, refresUser }) => {
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

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      });
      refresUser();
    }
  };

  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <div className='container'>
      <Form onSubmit={onSubmit} className='profileForm'>
        <input
          type={'text'}
          placeholder='Dispaly name'
          onChange={onChange}
          autoFocus
          value={newDisplayName}
          className='formInput'
        />
        <input
          type={'submit'}
          value='Update Profile'
          className='formBtn'
          style={{
            marginTop: 10,
          }}
        />
      </Form>
      <span className='formBtn cancelBtn logOut' onClick={onLogOut}>
        Log Out
      </span>
    </div>
  );
};
const Form = styled.form``;

export default Profile;
