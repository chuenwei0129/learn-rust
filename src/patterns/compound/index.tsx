import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMinus,
  faMinusCircle,
  faMinusSquare,
  faPlus,
  faPlusCircle,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
library.add(faPlus, faPlusCircle, faPlusSquare, faMinus, faMinusCircle, faMinusSquare);

export type CounterProps = {
  /**
   * 初始状态
   * @default 0
   */
  initialValue?: number;
  label: string;
  iconDecrement: 'minus' | 'circle-minus' | 'square-minus';
  iconIncrement: 'plus' | 'circle-plus' | 'square-plus';
  max?: number;
  onChange: (count: number) => void;
};

export const Counter: FC<CounterProps> = ({
  initialValue = 0,
  label,
  iconDecrement,
  iconIncrement,
  max,
  onChange,
}) => {
  const [count, setCount] = React.useState(initialValue);

  const hasError = max ? count >= max : false;

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(Math.max(0, count - 1));
  };

  const firstMounded = useRef(true);

  useEffect(() => {
    if (!firstMounded.current) {
      onChange && onChange(count);
    }
    firstMounded.current = false;
  }, [count, onChange]);

  return (
    <StyledCounter>
      <StyledButton onClick={handleDecrement}>
        <FontAwesomeIcon icon={iconDecrement} color="#17a2b8" />
      </StyledButton>
      <StyledLabel>{label}</StyledLabel>
      <StyledCount hasError={hasError}>{count}</StyledCount>
      <StyledButton onClick={handleIncrement}>
        <FontAwesomeIcon icon={iconIncrement} color="#17a2b8" />
      </StyledButton>
    </StyledCounter>
  );
};

const StyledLabel = styled.div`
  background-color: #e9ecef;
  color: #495057;
  padding: 5px 7px;
`;

const StyledCount = styled.div<{ hasError: boolean }>`
  background-color: ${({ hasError }) => (hasError ? '#bd2130' : '#17a2b8')};
  color: white;
  padding: 5px 7px;
`;

const StyledButton = styled.button`
  background-color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:active,
  &:focus {
    outline: none;
  }
`;

const StyledCounter = styled.div`
  display: inline-flex;
  border: 1px solid #17a2b8;
  line-height: 1.5;
  border-radius: 0.25rem;
  overflow: hidden;
`;
