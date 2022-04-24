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
} from 'firebase/firestore';
import { useEffect } from 'react';
import { ref, uploadString, getDownloadURL } from '@firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const NweetFactory = ({ userObj }) => {
  const [wteer, setWteer] = useState('');
  const [wteers, setWteers] = useState([]);
  const [attachment, setAttachment] = useState('');
  useEffect(() => {
    const q = query(
      collection(dbService, 'wteers'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      if (wteer === '') {
        return;
      }
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWteers(nweetArr);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = '';
    if (attachment != '') {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, attachment, 'data_url');

      attachmentUrl = await getDownloadURL(response.ref);
    }
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
      <form onSubmit={onSubmit} className='factoryForm'>
        <div className='factoryInput__container'>
          <input
            className='factoryInput__input'
            value={wteer}
            onChange={onChange}
            type='text'
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type='submit' value='&rarr;' className='factoryInput__arrow' />
        </div>
        <label htmlFor='attach-file' className='factoryInput__label'>
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>

        <input
          id='attach-file'
          type='file'
          accept='image/*'
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
        {attachment && (
          <div className='factoryForm__attachment'>
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
            />
            <div className='factoryForm__clear' onClick={onClearPhot}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NweetFactory;
