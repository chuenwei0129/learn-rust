---
title: Text
group:
  title: Text
nav:
  title: 'Components'
  path: /components
---

## Text

```tsx
import { Text, Container } from 'nes-react';
import React from 'react';

export default () => (
  <Container title="Texts" center>
    <Text>Normal</Text>
    <br />
    <Text type="primary">Primary</Text>
    <br />
    <Text type="success">Success</Text>
    <br />
    <Text type="warning">Warning)</Text>
    <br />
    <Text type="error">Error</Text>
    <br />
    <Text type="disabled">Disabled</Text>
  </Container>
);
```

<API>
