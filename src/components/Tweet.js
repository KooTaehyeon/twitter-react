import React from 'react';
import { dbService } from '../fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import { useState } from 'react';

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const NweetTextRef = doc(dbService, 'wteers', `${tweetObj.id}`);
    const ok = window.confirm('삭제 할거에요?');
    console.log(ok);
    if (ok) {
      //delete
      await deleteDoc(NweetTextRef);
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    const NweetTextRef = doc(dbService, 'wteers', `${tweetObj.id}`);
    console.log(tweetObj, newTweet);
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
