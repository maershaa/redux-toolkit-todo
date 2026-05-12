import { createReducer } from '@reduxjs/toolkit';
import { addTodo, deleteTodo, toggleTodo } from './todosActions';

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

// createReducer создает reducer и позволяет
// обрабатывать actions через builder.addCase().

// Под капотом Redux Toolkit использует Immer.
// Благодаря этому можно писать код в стиле мутации state,
// но Immer автоматически создает immutable state.

const todoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        isCompleted: false,
      });
    })

    .addCase(deleteTodo, (state, action) => {
      state.items = state.items.filter((el) => el.id !== action.payload);
    })

    .addCase(toggleTodo, (state, action) => {
      const todo = state.items.find((todo) => todo.id === action.payload);

      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
});

export { todoReducer };
