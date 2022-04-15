import React from 'react';
import { dbService, storageService } from '../fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import { useState } from 'react';
import { deleteObject, ref, getFirestore } from '@firebase/storage';

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const NweetTextRef = doc(dbService, 'wteers', `${tweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm('삭제 할거에요?');
    console.log(ok);
    if (ok) {
      //delete
      await deleteDoc(NweetTextRef);
      const urlRef = ref(storageService, tweetObj.attachmentURL);
      await deleteObject(urlRef);
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();

    await updateDoc(NweetTextRef, {
      text: newTweet,
    });
    setEditing((prev) => !prev);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  };
  console.log(tweetObj);
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type={'text'}
              placeholder={'수정할내용을 적으세요'}
              value={newTweet}
              required
              onChange={onChange}
            />
            <input type={'submit'} value='완료' />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          <div>
            <img src={tweetObj.attachmentUrl} width='150px' height={'150px'} />{' '}
          </div>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>수정</button>
              <button onClick={onDeleteClick}>삭제</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
