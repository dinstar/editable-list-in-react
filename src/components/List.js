import React, { useCallback } from 'react';

import ListItem from './ListItem';
import NestedListListItem from './NestedListListItem';

import css from './List.module.css';

export default function List({
  items = [],
  onListItemAdd,
  onListItemDelete,
  onListItemEdit,
  onListItemUpdate,
  onNestedListCreate,
}) {
  console.log(css);
  const lastItemIdx = items.length - 1;

  const selectAbove = useCallback((id) => {
    const index = items.findIndex(item => item.id == id);
    const el = document.getElementById('tb_'+ (index - 1));
    if (el)
    {
      el.focus();
      el.select();
    }
  });

  const selectBellow = useCallback((id, { isEmpty }) => {
    const index = items.findIndex(item => item.id == id);
    const el = document.getElementById('tb_'+ (index + 1))
    if (el)
    {
      el.focus();
      el.select();
    }
    else
      onListItemAdd(id, { isEmpty });
  });

  return (
    <ol className={css.ListRoot}>
      {items.map((item, i) => (
        <ListItem
          onListItemAdd={onListItemAdd}
          onListItemDelete={onListItemDelete}
          onListItemEdit={onListItemEdit}
          onListItemUpdate={onListItemUpdate}
          onNestedListCreate={onNestedListCreate}
          selectAbove={selectAbove}
          selectBellow={selectBellow}
          key={item.id}
          index={i}
          item={item}
        />
      ))}
    </ol>
  );
}
