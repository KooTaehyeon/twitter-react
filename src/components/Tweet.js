import React from 'react';

const Tweet = ({ tweetObj, isOwner }) => {
  return (
    <div>
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button>수정</button>
          <button>삭제</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
