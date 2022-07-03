import { Button } from 'nes-react';
import React from 'react';
import './wrapper.css';

export default () => (
  <div className="wrapper">
    <Button size="lg" type="primary" disabled>
      Disabled
    </Button>
    <Button type="link" disabled>
      Disabled Link
    </Button>
  </div>
);
