import { CommonCounter } from 'nes-react';
import React from 'react';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <CommonCounter
      max={10}
      initialValue={11}
      label={'计数器'}
      iconDecrement={'minus'}
      iconIncrement={'plus'}
      onChange={handleChangeCounter}
    />
  );
};
