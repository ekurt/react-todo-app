import { TodoForm, TodoList } from './components'
import styles from "./App.module.css";
import { FaSun } from 'react-icons/fa';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.main}>

        <h1 className={styles.h1}>
          TODO
          <small>
            <FaSun />
          </small>
        </h1>

        <TodoForm />
        <TodoList />

      </div>
    </div>
  );
}

export default App;
