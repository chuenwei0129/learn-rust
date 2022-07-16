import React from 'react';
import styled from 'styled-components';
import { useCounterContext } from '../useCounterContext';

export const Count = ({ max }: { max?: number }) => {
  const { count } = useCounterContext();

  const hasError = max ? count >= max : false;

  return <StyledCount hasError={hasError}>{count}</StyledCount>;
};

Count.displayName = 'Count';

const StyledCount = styled.div<{ hasError: boolean }>`
  background-color: ${({ hasError }) => (hasError ? '#bd2130' : '#17a2b8')};
  color: white;
  padding: 5px 7px;
`;
