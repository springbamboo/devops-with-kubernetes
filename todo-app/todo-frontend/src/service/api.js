const asyncRequest = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Request failed with status ${response.status}`);
  }

  return response.json();
};

export const getTodos = async () => {
  const { todos } = await asyncRequest('/todos');
  return todos;
};

export const createTodo = (task) =>
  asyncRequest('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task }),
  });
