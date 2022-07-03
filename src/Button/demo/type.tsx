import { Button } from 'nes-react';
import React from 'react';
import './wrapper.css';

export default () => (
  <div className="wrapper">
    <Button type="default">Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="danger">Warning</Button>
    <Button type="error">Error</Button>
    <Button type="link" href="https://nostalgic-css.github.io/NES.css">
      Link
    </Button>
  </div>
);
