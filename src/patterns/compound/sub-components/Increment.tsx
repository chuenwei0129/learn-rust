import React from 'react';
import { CompoundCounterContext } from '..';
import Icon from '../../../components/Icon';
import { StyledButton } from './StyledButton';

export const Increment = ({ icon = 'plus' }: { icon: 'plus' | 'circle-plus' | 'square-plus' }) => {
  const { handleIncrement } = React.useContext(CompoundCounterContext);
  return (
    <StyledButton onClick={handleIncrement}>
      <Icon icon={icon} variant={'primary'}></Icon>
    </StyledButton>
  );
};
