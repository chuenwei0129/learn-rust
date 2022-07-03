import { Button } from 'nes-react';
import React from 'react';
import './wrapper.css';

export default () => (
  <div className="wrapper">
    <Button size="lg" type="primary">
      Large
    </Button>
    <Button size="md" type="success">
      Medium
    </Button>
    <Button size="sm">Small</Button>
  </div>
);
