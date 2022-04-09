import React from 'react';
import { useState } from 'react';

const Home = () => {
  const [wteer, setWteer] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setWteer(value);
  };
  return (
    <div>
      <from onSubmit={onSubmit}>
        <input
          value={wteer}
          onChange={onChange}
          type={'text'}
          placeholder="What's on your mind?"
          max={120}
        />
        <input type={'submit'} value={'Twitter'} />
      </from>
    </div>
  );
};

export default Home;
