import React from 'react';
import { useState } from 'react';
import { dbService } from '../fbase';
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
} from 'firebase/firestore';
import { useEffect } from 'react';
const Home = () => {
  const [wteer, setWteer] = useState('');
  const [wteers, setWteers] = useState([]);
  const getWweets = async () => {
    const q = query(collection(dbService, 'wteers'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const wweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setWteers((prev) => [wweetObj, ...prev]);
    });
  };
  useEffect(() => {
    getWweets();
  }, []);
  console.log(wteers);
  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(`서브밋 하는 느윗:${wteer}`);
    await addDoc(collection(dbService, 'wteers'), {
      wteer,
      createdAt: serverTimestamp(),
    });
    setWteer('');
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setWteer(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={wteer}
          onChange={onChange}
          type={'text'}
          placeholder="What's on your mind?"
          max={120}
        />
        <input type='submit' value={'Twitter'} />
      </form>
      <div>
        {wteers.map((item) => {
          return (
            <div key={item.id}>
              <h4>{item.wteer}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
