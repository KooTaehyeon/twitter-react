import React from 'react';
import { useState } from 'react';
import { dbService, storageService } from '../fbase';
import { v4 } from 'uuid';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { ref, uploadString, getDownloadURL } from '@firebase/storage';
import Tweet from '../components/Tweet';
import NweetFactory from '../components/NweetFactory';

const Home = ({ userObj }) => {
  const [wteers, setWteers] = useState([]);
  useEffect(() => {
    const q = query(
      collection(dbService, 'wteers'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWteers(nweetArr);
    });
  }, []);

  return (
    <div className='container'>
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {wteers.map((item, i) => {
          return (
            <Tweet
              key={i}
              tweetObj={item}
              isOwner={item.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
