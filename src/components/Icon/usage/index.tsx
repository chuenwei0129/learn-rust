import { Icon } from 'nes-react';
import React from 'react';

export default () => (
  <>
    <Icon icon={'code'} variant={'primary'} /> <Icon icon={'bug'} variant={'error'} />{' '}
    <Icon icon={'check'} variant={'success'} /> <Icon icon={'spinner'} variant={'warning'} spin />{' '}
    <Icon icon={'arrow-up'} variant={'default'} /> <Icon icon={'arrow-down'} />
  </>
);
