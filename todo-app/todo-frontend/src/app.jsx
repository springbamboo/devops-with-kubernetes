import { useEffect, useState } from 'preact/hooks';
import { createTodo, getTodos } from './service/api';

const TodoList = ({ todos, loading, error }) => {
  if (loading) {
    return <p>Loading todos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2>Todos</h2>
      <div class="todo-list">
        {todos.map((todo) => (
          <div class="todo-item" key={todo.id}>
            {todo.task}
          </div>
        ))}
      </div>
    </>
  );
};

const Image = () => {
  return (
    <>
      <img src="/api/image" alt="Random Image" />
    </>
  );
};

const TodoSubmitForm = ({ onTodoCreated }) => {
  const [task, setTask] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTask = task.trim();
    if (!trimmedTask) {
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const todo = await createTodo(trimmedTask);
      onTodoCreated(todo);
      setTask('');
    } catch {
      setError('Unable to create todo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form class="form-group" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new todo (max 140 characters)"
        maxlength="140"
        value={task}
        onInput={(event) => setTask(event.currentTarget.value)}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todoList = await getTodos();
        setTodos(todoList);
      } catch {
        setError('Unable to load todos.');
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleTodoCreated = (todo) => {
    setTodos((currentTodos) => [...currentTodos, todo]);
  };

  return (
    <>
      <div class="container">
        <h1>Todo App</h1>
        <Image />
        <TodoSubmitForm onTodoCreated={handleTodoCreated} />
        <TodoList todos={todos} loading={loading} error={error} />
      </div>
    </>
  );
}
