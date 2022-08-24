import React from 'react';
import { Icon } from 'react-component-patterns';

export default () => (
  <>
    <Icon icon={'code'} variant={'primary'} /> <Icon icon={'bug'} variant={'error'} />{' '}
    <Icon icon={'check'} variant={'success'} /> <Icon icon={'spinner'} variant={'warning'} spin />{' '}
    <Icon icon={'arrow-up'} variant={'default'} /> <Icon icon={'arrow-down'} />
  </>
);
