import { CompoundCounter } from 'nes-react';
import React from 'react';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <CompoundCounter onChange={handleChangeCounter} initialValue={9}>
      <CompoundCounter.Decrement icon="minus" />
      <CompoundCounter.Label>计数器</CompoundCounter.Label>
      <CompoundCounter.Count max={10} />
      <CompoundCounter.Increment icon="plus" />
    </CompoundCounter>
  );
};
