import React from 'react';
import { useState } from 'react';
import { dbService } from '../fbase';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect } from 'react';
import Tweet from '../components/Tweet';
const Home = ({ userObj }) => {
  const [wteer, setWteer] = useState('');
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
  console.log(wteers);
  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(`서브밋 하는 트윗:${wteer}`);
    await addDoc(collection(dbService, 'wteers'), {
      text: wteer,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
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
