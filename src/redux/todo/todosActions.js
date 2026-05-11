const addTodo = (todoText) => ({ type: 'todos/add', payload: todoText });
const deleteTodo = (id) => ({ type: 'todos/delete', payload: id });

const toggleTodo = (id) => ({
  type: 'todos/toggle',
  payload: id,
});

export { addTodo, deleteTodo, toggleTodo };
