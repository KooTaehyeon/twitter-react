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

const Home = ({ userObj }) => {
  const [wteer, setWteer] = useState('');
  const [wteers, setWteers] = useState([]);
  const [attachment, setAttachment] = useState('');
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
    let attachmentUrl = '';
    if (attachment != '') {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, attachment, 'data_url');

      attachmentUrl = await getDownloadURL(response.ref);
    }
    // await addDoc(collection(dbService, 'wteers'), {
    //   text: wteer,
    //   createdAt: serverTimestamp(),
    //   creatorId: userObj.uid,
    // });
    // setWteer('');

    const wweetObj = {
      text: wteer,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await addDoc(collection(dbService, 'wteers'), wweetObj);
    setWteer('');
    setAttachment('');
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setWteer(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedE) => {
      const {
        currentTarget: { result },
      } = finishedE;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearPhot = () => {
    setAttachment('');
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
        <input type={'file'} accept={'image/*'} onChange={onFileChange} />
        <input type='submit' value={'Twitter'} />
        {attachment && (
          <div>
            <img src={attachment} width='50px' height={'50px'} />
            <button onClick={onClearPhot}>이미지 제거</button>
          </div>
        )}
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
