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

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'todos/add':
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: Date.now(),
            text: action.payload,
            isCompleted: false,
          },
        ],
      };

    case 'todos/toggle':
      return {
        ...state,
        items: state.items.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                isCompleted: !todo.isCompleted,
              }
            : todo,
        ),
      };

    case 'todos/delete':
      return {
        ...state,
        items: [...state.items.filter((el) => el.id !== action.payload)],
      };

    default:
      return state;
  }
};

export { todoReducer };
