import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../redux/counterSlice';
import { todoReducer } from './todo/todoReducer';
import { filterReducer } from './filter/filterReducer';

export default configureStore({
  reducer: {
    todos: todoReducer, // Доступ будет через state.todos.items
    filter: filterReducer, // Доступ будет через state.filter.value
  },
});
