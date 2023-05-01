import React, { useCallback } from 'react';

import ListItem from './ListItem';
import NestedListListItem from './NestedListListItem';

import css from './List.module.css';

export default function List({
  items = [],
  onListItemAdd,
  onListItemEdit,
  onListItemUpdate,
  onNestedListCreate,
}) {
  console.log(css);
  const lastItemIdx = items.length - 1;

  return (
    <ol className={css.ListRoot}>
      {items.map((item, i) => (
        <ListItem
          onListItemAdd={onListItemAdd}
          onListItemEdit={onListItemEdit}
          onListItemUpdate={onListItemUpdate}
          onNestedListCreate={onNestedListCreate}
          key={item.id}
          item={item}
          showAddButton={i === lastItemIdx}
        />
      ))}
    </ol>
  );
}
