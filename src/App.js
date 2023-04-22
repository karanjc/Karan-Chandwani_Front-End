import React from 'react';
import List from './List';

const items = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3' },
];

const App = () => {
  return <List items={items} />;
};

export default App;
