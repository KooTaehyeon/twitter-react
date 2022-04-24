import React from 'react';
import { dbService, storageService } from '../fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { deleteObject, ref, getFirestore } from '@firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
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
    <div className='nweet'>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className='container nweetEdit'>
            <input
              type={'text'}
              placeholder={'수정할내용을 적으세요'}
              value={newTweet}
              required
              autoFocus
              onChange={onChange}
              className='formInput'
            />
            <input type={'submit'} value='완료' />
          </form>
          <span onClick={toggleEditing} className='formBtn cancelBtn'>
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          <div>
            {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
          </div>
          {isOwner && (
            <>
              <div className='nweet__actions'>
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
