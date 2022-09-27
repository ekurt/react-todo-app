import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Todo, TodoFooter } from "../";
import { FaRegDotCircle } from "react-icons/fa";
import styles from "./index.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const TodoList = ({
  todo,
  todos,
  setTodos,
  doneHandle,
  deleteHandle,
  deleteCompletedHandle,
  filter,
  setFilter,
  priority,
}) => {
  const [temp, setTemp] = useState(todo);
  const [isDragDisabled, setDragDisabled] = useState(false);

  let todoClass = classNames(
    styles.todo,
    { [styles.normal]: priority === 0 },
    { [styles.low]: priority === 1 },
    { [styles.medium]: priority === 2 },
    { [styles.high]: priority === 3 }
  );

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

  const notify = () => {
    toast(`📋 Copied to clipboard!`, {
      position: "top-right",
      theme: "light",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
        <div className={todoClass}>
          <FaRegDotCircle
            size={30}
            style={{ fill: "url(#gradient)" }}
            className={styles.checkTemp}
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
              className={styles.todoContainer}
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
                    isDragDisabled={isDragDisabled ? isDragDisabled : item.done}
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
                          notify={notify}
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

      <ToastContainer />

      <TodoFooter
        todos={todos}
        deleteCompletedHandle={deleteCompletedHandle}
        setFilter={setFilter}
        setDragDisabled={setDragDisabled}
      />
    </div>
  );
};
