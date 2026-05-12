import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';
import filterReducer from './filter/filterSlice'; // название filterReducer появилось так как default export можно назвать как угодно и для удобства понимания что это reducer так назвала

export default configureStore({
  reducer: {
    todos: todoReducer, // Доступ будет через state.todos.items
    filter: filterReducer, // Доступ будет через state.filter.value
  },
});
