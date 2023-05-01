import React, { useCallback, useState, useRef, useEffect } from 'react';
import cn from 'classnames';

import List from './List';

import css from './ListItem.module.css';

export default React.memo(function ListItem({
  item,
  onListItemAdd,
  onListItemUpdate,
  onListItemEdit,
  onNestedListCreate,
  showAddButton = true,
  showNestedListAddButton = true,
}) {
  const { id, text, editing, completed } = item;

  const inputRef = useRef(null);

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
      if (event.key === 'Enter' || event.key === 'Escape') {
        if (updatedText !== text) onListItemUpdate({ text: updatedText, id });
        else onListItemEdit(id, false);
      }
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
        <div className={css.buttonContainer}>
          {showNestedListAddButton && (
            <button
              className={css.addButton}
              onClick={() => onNestedListCreate(id)}
            >
              ⑃
            </button>
          )}
          {showAddButton && (
            <button className={css.addButton} onClick={() => onListItemAdd(id)}>
              +
            </button>
          )}
        </div>
      </div>
      {nestedList}
    </li>
  );
});
