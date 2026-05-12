import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'all',
};

// createSlice автоматически объединяет: createAction и createReducer
// и генерирует:
// - actions
// - reducer
// - action types

const filterSlice = createSlice({
  name: 'filter', //name используется как префикс для action types (напр. name: 'filter' и setFilter будет => filter/setFilter)
  initialState,
  reducers: {
    setFilter(state, action) {
      //создаем редьюсер для обработки данных из состояния и payload который придет. эквивалентные одному оператору case в операторе switch
      state.value = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions; // actions генерируются автоматически

export default filterSlice.reducer; // reducer экспортируется для store

// createSlice возвращает объект:
// {
//   name,
//   reducer, - потому эскпортируем редьюсеры отсюда
//   actions,  - потому эскпортируем экшены отсюда
//   caseReducers
// }
