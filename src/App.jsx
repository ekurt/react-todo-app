import React, { useEffect } from "react";
import { TodoForm, TodoList, Header, Footer } from "./components";
import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setPriority, setVolumes } from "./stores/site";
import { db } from "./config/firebase";
import { ref, onValue, set } from "firebase/database";
import { setTodos } from "./stores/todo";

const LOCAL_STORAGE_TODOS = "todo-app-todos";
const LOCAL_STORAGE_MUTED = "todo-app-muted";
const LOCAL_STORAGE_SORTED = "todo-app-sorted";

function App() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);
  const { muted, sort } = useSelector((state) => state.site);
  const { user } = useSelector((state) => state.user);

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

  useEffect(() => {
    if (user) {
      onValue(ref(db, `/todos/${user.id}`), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          dispatch(setTodos([]));
          dispatch(setTodos(data));
        }
      });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos));
    dispatch(setPriority(0));
    if (user) {
      set(ref(db, `/todos/${user.id}`), todos);
    }
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_MUTED, Number(muted));
    muted === 1
      ? dispatch(setVolumes(mutedValues))
      : dispatch(setVolumes(unmutedValues));
  }, [muted]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_SORTED, Number(sort));
  }, [sort]);

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <Header />

        <TodoForm />

        <TodoList />

        <Footer />
      </div>
    </div>
  );
}

export default App;
