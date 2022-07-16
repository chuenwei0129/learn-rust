import React from 'react';
import { CompoundCounterContext } from '..';
import Icon from '../../../components/Icon';
import { StyledButton } from './StyledButton';

export const Decrement = ({
  icon = 'minus',
}: {
  icon: 'minus' | 'circle-minus' | 'square-minus';
}) => {
  const { handleDecrement } = React.useContext(CompoundCounterContext);
  return (
    <StyledButton onClick={handleDecrement}>
      <Icon icon={icon} variant={'primary'}></Icon>
    </StyledButton>
  );
};
