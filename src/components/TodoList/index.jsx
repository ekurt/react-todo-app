import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Todo, TodoFooter } from "../";
import { FaRegDotCircle } from "react-icons/fa";
import styles from "./index.module.css";

export const TodoList = ({
  todo,
  todos,
  setTodos,
  doneHandle,
  deleteHandle,
  deleteCompletedHandle,
  filter,
  setFilter,
}) => {
  const [temp, setTemp] = useState(todo);
  const [isDragDisabled, setDragDisabled] = useState(false);

  useEffect(() => {
    setTemp(todo);
  }, [todo]);

  const handleOnDrugEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  return (
    <div className={styles.todoList}>
      <svg width="0" height="0">
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop stopColor="#2ec0ff" offset="0%" />
          <stop stopColor="#be82ff" offset="60%" />
        </linearGradient>
      </svg>
      {temp ? (
        <div className={styles.todo}>
          <FaRegDotCircle
            size={30}
            style={{ fill: "url(#gradient)" }}
            className={styles.check}
          />
          <span className={styles.todoItemTemp}>{temp}</span>
        </div>
      ) : null}

      {todos.length == 0 && !temp ? (
        <div className={styles.todo}>
          <span className={styles.todoItem}>
            There is nothing to do here 🥳
          </span>
        </div>
      ) : null}

      <DragDropContext onDragEnd={handleOnDrugEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div
              className="w-full flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos
                .filter((todo) =>
                  filter !== null ? todo.done === filter : todo
                )
                .map((item, index) => (
                  <Draggable
                    key={`${item.id}`}
                    draggableId={`${item.id}`}
                    index={index}
                    isDragDisabled={isDragDisabled}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Todo
                          todo={item}
                          doneHandle={doneHandle}
                          deleteHandle={deleteHandle}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <TodoFooter
        todos={todos}
        deleteCompletedHandle={deleteCompletedHandle}
        setFilter={setFilter}
        setDragDisabled={setDragDisabled}
      />
    </div>
  );
};
