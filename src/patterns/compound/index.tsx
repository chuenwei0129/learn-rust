import React, { createContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Count } from './sub-components/Count';
import { Decrement } from './sub-components/Decrement';
import { Increment } from './sub-components/Increment';
import { Label } from './sub-components/Label';

type CompoundCounterProps = {
  initialValue?: number;
  onChange?: (value: number) => void;
  children: React.ReactNode;
};

export const CompoundCounterContext = createContext(
  {} as {
    count: number;
    handleIncrement: () => void;
    handleDecrement: () => void;
  },
);

const CompoundCounter = ({ initialValue = 0, onChange, children }: CompoundCounterProps) => {
  const [count, setCount] = useState(initialValue);

  const firstMounded = useRef(true);

  useEffect(() => {
    if (!firstMounded.current) {
      onChange && onChange(count);
    }
    firstMounded.current = false;
  }, [count, onChange]);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(Math.max(0, count - 1));
  };

  return (
    <CompoundCounterContext.Provider value={{ count, handleDecrement, handleIncrement }}>
      <StyledCounter>{children}</StyledCounter>
    </CompoundCounterContext.Provider>
  );
};

const StyledCounter = styled.div`
  display: inline-flex;
  border: 1px solid #17a2b8;
  line-height: 1.5;
  border-radius: 0.25rem;
  overflow: hidden;
`;

CompoundCounter.Count = Count;
CompoundCounter.Label = Label;
CompoundCounter.Increment = Increment;
CompoundCounter.Decrement = Decrement;

export { CompoundCounter };
