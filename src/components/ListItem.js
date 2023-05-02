import React, { useCallback, useState, useRef, useEffect } from 'react';
import cn from 'classnames';

import List from './List';

import css from './ListItem.module.css';

export default React.memo(function ListItem({
  item,
  onListItemAdd,
  onListItemDelete,
  onListItemUpdate,
  onListItemEdit,
  onNestedListCreate,
  selectAbove,
  selectBellow,
  index
}) {
  const { id, text, editing, completed } = item;

  const inputRef = useRef(null);
  const isEmpty = useRef(text == '');

  const [updatedText, setUpdatedText] = useState(text);

  useEffect(() => {
    setUpdatedText(text);
  }, [text]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleKeyUp = useCallback(
    (event) => {
      if (event.key === 'Backspace' && updatedText == '')
      {
        if (isEmpty.current)
          onListItemDelete(id);
      }
      isEmpty.current = updatedText == '';
      if (event.key === 'ArrowUp')
        selectAbove(id, { isEmpty: isEmpty.current });
        else if (event.key === 'ArrowDown')
          selectBellow(id, { isEmpty: isEmpty.current });
      else if (event.key === 'Enter')
        onListItemAdd(id, { isEmpty: isEmpty.current });
    },
    [onListItemUpdate, updatedText, text, id]
  );

  const handleCheckboxClick = useCallback(() => {
    onListItemUpdate({ id, completed: !completed });
  }, [id, completed]);

  const handleChange = useCallback((event) => {
    setUpdatedText(event.target.value);
  }, []);

  let nestedList = null;

  if (item.children) {
    nestedList = (
      <div className={css.nestedList}>
        <List
          onListItemAdd={onListItemAdd}
          onListItemDelete={onListItemDelete}
          onListItemUpdate={onListItemUpdate}
          onListItemEdit={onListItemEdit}
          onNestedListCreate={onNestedListCreate}
          items={item.children}
        />
      </div>
    );
  }

  return (
    <li className={css.ListItem}>
      <div className={css.ListItemLine}>
        <input
          className={css.checkbox}
          onChange={handleCheckboxClick}
          type="checkbox"
          checked={completed}
        />
        {editing && (
          <input
            type="text"
            id={'tb_'+ index}
            ref={inputRef}
            onKeyUp={handleKeyUp}
            onChange={handleChange}
            className={css.input}
            value={updatedText}
          />
        )}
        {!editing && (
          <div
            className={cn(completed && css.completed)}
            onClick={() => onListItemEdit(id, true)}
          >
            {text}
          </div>
        )}
      </div>
      {nestedList}
    </li>
  );
});
