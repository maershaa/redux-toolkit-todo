import { createAction } from '@reduxjs/toolkit';

// createAction создает action creator.
// Внутри автоматически формируется объект:
// { type, payload }

export const addTodo = createAction('todos/add');
export const deleteTodo = createAction('todos/delete');
export const toggleTodo = createAction('todos/toggle');
