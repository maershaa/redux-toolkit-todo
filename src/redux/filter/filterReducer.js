const initialState = {
  value: 'all',
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'filter/set':
      return {
        ...state,
        value: action.payload,
      };

    default:
      return state;
  }
};

export { filterReducer };
