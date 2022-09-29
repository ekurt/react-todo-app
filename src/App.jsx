import React, { useState, useEffect } from "react";
import { TodoForm, TodoList, Header, Footer } from "./components";
import styles from "./App.module.css";
import useSound from "use-sound";

const LOCAL_STORAGE_TODOS = "react-todo-list-todos";
const LOCAL_STORAGE_MUTED = "react-todo-list-muted";

function App() {
  const starterList = [
    {
      id: Date.now() + 1,
      todo: "📋 You can copy todo by press on it",
      done: false,
      date: new Date().toLocaleString(),
      priority: 0,
    },
    {
      id: Date.now() + 2,
      todo: "🚦 You can set priority by @0, @1, @2, @3",
      done: false,
      date: new Date().toLocaleString(),
      priority: 2,
    },
    {
      id: Date.now() + 3,
      todo: "✨ You can drag-drop todos",
      done: false,
      date: new Date().toLocaleString(),
      priority: 1,
    },
    {
      id: Date.now() + 4,
      todo: "💻 You can right click for info (Desktop)",
      done: false,
      date: new Date().toLocaleString(),
      priority: 3,
    },
    {
      id: Date.now() + 5,
      todo: "📱 You can two finger click for info (Mobile)",
      done: false,
      date: new Date().toLocaleString(),
      priority: 3,
    },
  ].sort((a, b) =>
    b.priority > a.priority ? 1 : a.priority > b.priority ? -1 : 0
  );

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS)) || starterList
  );
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState(0);
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(true);

  const [muted, setMuted] = useState(
    Number(localStorage.getItem(LOCAL_STORAGE_MUTED)) || 0
  );

  const mutedValues = {
    playScribble: 0,
    playCheck: 0,
    playRemove: 0,
    playFlip: 0,
    playSort: 0,
    playClearAll: 0,
  };

  const unmutedValues = {
    playScribble: 0.5,
    playCheck: 0.05,
    playRemove: 0.5,
    playFlip: 0.25,
    playSort: 0.25,
    playClearAll: 1,
  };

  const [volumes, setVolumes] = useState(muted ? mutedValues : unmutedValues);

  const [playScribble] = useSound("assets/sounds/scribble.wav", {
    volume: volumes.playScribble,
  });

  const [playCheck] = useSound("assets/sounds/check.wav", {
    volume: volumes.playCheck,
  });

  const [playSort] = useSound("assets/sounds/sort.wav", {
    volume: volumes.playSort,
  });

  const [playRemove] = useSound("assets/sounds/remove.wav", {
    volume: volumes.playRemove,
  });

  const [playClearAll] = useSound("assets/sounds/clearAll.wav", {
    volume: volumes.playClearAll,
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos));
    setPriority(0);
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_MUTED, Number(muted));
    muted === 1 ? setVolumes(mutedValues) : setVolumes(unmutedValues);
  }, [muted]);

  const submitHandle = (e) => {
    e.preventDefault();

    if (!todo) return;

    playScribble();

    setTodos([
      {
        id: Date.now(),
        todo: todo,
        done: false,
        date: new Date().toLocaleString(),
        priority: priority,
      },
      ...todos,
    ]);

    setTodo("");
  };

  const changeHandle = (e) => {
    e.preventDefault();

    if (/@[0123]+/.test(e.target.value)) {
      setTodo(e.target.value.replace(/@[0123]+/, ""));
      setPriority(Number(e.target.value.match(/@[0123]+/)[0].replace("@", "")));
    } else {
      setTodo(e.target.value);
    }
  };

  const doneHandle = (id) => {
    playCheck();
    setTodos(
      todos
        .map((todo) => {
          if (todo.id == id) {
            return {
              ...todo,
              done: !todo.done,
            };
          }
          return todo;
        })
        .sort((a, b) => (a.done > b.done ? 1 : b.done > a.done ? -1 : 0))
    );
  };

  const sortHandle = () => {
    playSort();
    setTodos(
      todos
        .map((todo) => todo)
        .sort((a, b) => {
          if (sort) {
            if (!a.done && !b.done) {
              setSort(false);
              return a.priority > b.priority
                ? 1
                : b.priority > a.priority
                ? -1
                : 0;
            }
          } else {
            if (!a.done && !b.done) {
              setSort(true);
              return b.priority > a.priority
                ? 1
                : a.priority > b.priority
                ? -1
                : 0;
            }
          }
        })
    );
  };

  const deleteAllHandle = () => {
    playClearAll();
    setTodos([]);
  };

  const deleteHandle = (id) => {
    playRemove();
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteCompletedHandle = () => {
    setTodos(todos.filter((todo) => !todo.done));
  };

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <Header
          todos={todos}
          sortHandle={sortHandle}
          deleteAllHandle={deleteAllHandle}
          muted={muted}
          setMuted={setMuted}
        />

        <TodoForm
          submitHandle={submitHandle}
          changeHandle={changeHandle}
          todo={todo}
          setTodo={setTodo}
          volumes={volumes}
        />

        <TodoList
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          doneHandle={doneHandle}
          deleteHandle={deleteHandle}
          deleteCompletedHandle={deleteCompletedHandle}
          filter={filter}
          setFilter={setFilter}
          priority={priority}
          volumes={volumes}
          muted={muted}
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;
