import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      text: 'Замариновать курицу в соевом соусе и меде',
      isCompleted: true,
    },
    {
      id: 2,
      text: 'Нарезать овощи соломкой',
      isCompleted: true,
    },
    {
      id: 3,
      text: 'Обжарить кунжут до золотистого цвета',
      isCompleted: false,
    },
    {
      id: 4,
      text: 'Приготовить соус терияки вручную',
      isCompleted: false,
    },
  ],
};

// createSlice автоматически объединяет: createAction и createReducer
// и генерирует:
// - actions
// - reducer
// - action types
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // action.type => 'todos/addTodo'
    addTodo(state, action) {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        isCompleted: false,
      });
    },
    // action.type => 'todos/deleteTodo'
    deleteTodo(state, action) {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    // action.type => 'todos/toggleTodo'
    toggleTodo(state, action) {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions; // actions генерируются автоматически

export default todoSlice.reducer; // reducer экспортируется для store

// createSlice возвращает объект:
// {
//   name,
//   reducer, - потому эскпортируем редьюсеры отсюда
//   actions,  - потому эскпортируем экшены отсюда
//   caseReducers
// }
