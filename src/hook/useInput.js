import { useState } from 'react';

// 인풋창 핸들링하는 커스텀훅

const useInput = (initalValue) => {
  const [value, setValue] = useState(initalValue);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };
  return { value, onChange };
};
export default useInput;
