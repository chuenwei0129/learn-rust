import { CustomHookCounter, useCounter } from 'nes-react';
import React from 'react';

export default () => {
  const [count, increment, decrement] = useCounter(0);

  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <>
      <CustomHookCounter value={count} onChange={handleChangeCounter}>
        <CustomHookCounter.Decrement icon="minus" onClick={decrement} />
        <CustomHookCounter.Label>计数器</CustomHookCounter.Label>
        <CustomHookCounter.Count max={10} />
        <CustomHookCounter.Increment icon="plus" onClick={increment} disabled={count === 12} />
      </CustomHookCounter>{' '}
      {/* 逻辑复用 */}
      <button onClick={increment} disabled={count >= 6}>
        Custom increment btn 1
      </button>
    </>
  );
};
