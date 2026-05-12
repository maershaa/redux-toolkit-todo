import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { addTodo, deleteTodo, toggleTodo } from '../redux/todo/todoSlice'; //импорты редьюсеров для todo
import { setFilter } from '../redux/filter/filterSlice'; //импорты редьюсеров для filter

function App() {
  const todos = useSelector((state) => state.todos.items);
  const filter = useSelector((state) => state.filter.value);
  const filters = ['all', 'active', 'completed'];

  const dispatch = useDispatch();

  const handleAddTodo = (evt) => {
    evt.preventDefault();
    const todoText = evt.target.todoText.value.trim();
    dispatch(addTodo(todoText));
    evt.target.todoText.value = '';
  };

  const handleTodoDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  const toggleTodoStatus = (todoId) => {
    dispatch(toggleTodo(todoId));
  };

  const handleFilterChange = (filterName) => {
    dispatch(setFilter(filterName));
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((el) => el.isCompleted === false);
    } else if (filter === 'completed') {
      return todos.filter((el) => el.isCompleted === true);
    } else {
      return todos;
    }
  }, [filter, todos]);

  return (
    <>
      <section>
        <h2>Список задач</h2>

        <ul className="filter_list">
          {filters.map((item) => (
            <li key={item} className={filter === item ? 'active' : ''}>
              <button type="button" onClick={() => handleFilterChange(item)}>
                {item.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>

        <ul className="tasks_list">
          {filteredTodos.map(({ id, text, isCompleted }) => (
            <li key={id} className="task">
              <label>
                <input
                  type="checkbox"
                  checked={isCompleted === true}
                  id={`completed-${id}`}
                  name="completed"
                  onChange={() => toggleTodoStatus(id)}
                  className="todo-checkbox"
                />
              </label>

              <p className={isCompleted === true ? 'completed' : ''}>{text}</p>
              <button
                type="button"
                onClick={() => handleTodoDelete(id)}
                className="delete_btn"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      d="M10 12V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                    <path
                      d="M14 12V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                    <path
                      d="M4 7H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                    <path
                      d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                    <path
                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                  </g>
                </svg>{' '}
              </button>
            </li>
          ))}
        </ul>

        <form className="todo-form" onSubmit={handleAddTodo}>
          <input
            type="text"
            name="todoText"
            placeholder="Добавить новую задачу"
            className="todo-input"
          />
          <button type="submit" className="todo-button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  opacity="0.5"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  fill="#1C274C"
                />
                <path
                  d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                  fill="#1C274C"
                />
              </g>
            </svg>
          </button>
        </form>
      </section>
    </>
  );
}

export default App;
