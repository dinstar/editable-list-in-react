import React, { useState, useCallback } from 'react';
import './style.css';

import List from './components/List';

const sourceItems = [{ editing: true, id: Date.now(), text: 'Hello', completed: true }];

export default function App() {
  const [items, setItems] = useState(sourceItems);

  const handleAdd = useCallback((id, { isEmpty }) => {
    setItems((value) => {
      const newItem = { id: Date.now(), text: '', editing: true, completed: false };
      const index = value.findIndex(item => item.id == id);
      if ( ! isEmpty || index < value.length - 1)
        value.splice(index + 1, 0, newItem);
      return [...value]
    });
  }, []);

  const handleDelete = useCallback((id) => {
      setItems((value) => {
        if (value.length > 1)
          return [...(value.filter(item => item.id != id))]
        else
          return value;
      });
  }, []);

  const handleEdit = useCallback((id, state) => {
    setItems((value) => {
      const itemIndex = value.findIndex((item) => item.id === id);

      if (!value[itemIndex]) {
        throw new Error('Failed to find item trying to set `editing` flag');
      }

      const updatedItem = { ...value[itemIndex], editing: state };

      return [
        ...value.slice(0, itemIndex),
        updatedItem,
        ...value.slice(itemIndex + 1),
      ];
    });
  }, []);

  const handleUpdate = useCallback(({ id, text: updatedText, completed }) => {
    setItems((value) => {
      const itemIndex = value.findIndex((item) => item.id === id);

      if (!value[itemIndex]) {
        throw new Error('Failed to find item trying to update text');
      }

      const updatedItem = {
        ...value[itemIndex],
        text: updatedText || value[itemIndex].text,
        // editing: false,
        completed:
          completed != undefined ? completed : value[itemIndex].completed,
      };

      return [
        ...value.slice(0, itemIndex),
        updatedItem,
        ...value.slice(itemIndex + 1),
      ];
    });
  }, []);

  const handleNestedListCreate = useCallback((id) => {
    console.log('creating nested list');
    setItems((value) => {
      const itemIndex = value.findIndex((item) => item.id === id);

      if (!value[itemIndex]) {
        throw new Error('Failed to find parent item trying to add nested list');
      }

      const updatedItem = {
        ...value[itemIndex],
        children: [
          { id: Date.now(), text: '', editing: true, completed: false },
        ],
      };

      return [
        ...value.slice(0, itemIndex),
        updatedItem,
        ...value.slice(itemIndex + 1),
      ];
    });
  }, []);

  return (
    <List
      items={items}
      onListItemAdd={handleAdd}
      onListItemDelete={handleDelete}
      onListItemEdit={handleEdit}
      onListItemUpdate={handleUpdate}
      onNestedListCreate={handleNestedListCreate}
    />
  );
}
