import { createReducer } from '@reduxjs/toolkit';
import { setFilter } from './filterActions';

const initialState = {
  value: 'all',
};
const filterReducer = createReducer(initialState, (builder) => {
  builder.addCase(setFilter, (state, action) => {
    state.value = action.payload;
  });
});

export { filterReducer };
