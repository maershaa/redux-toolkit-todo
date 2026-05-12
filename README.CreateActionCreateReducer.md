# Todo List — Redux Toolkit: createAction + createReducer

Учебный проект Todo List для изучения современной Redux Toolkit архитектуры.

Проект реализован с использованием:

- configureStore
- createAction
- createReducer
- builder.addCase()
- Immer
- dispatch
- useSelector
- useDispatch

---

# Технологии

- React
- Redux Toolkit
- React Redux
- Vite
- CSS

---

# Особенности реализации

В проекте используется Redux Toolkit вместо классического Redux-подхода через switch/case.

Redux Toolkit уменьшает количество boilerplate-кода и упрощает работу с immutable state благодаря Immer.

---

# Структура проекта

src/
│
├── redux/
│
├── store.js
│
├── todo/
│ ├── todoReducer.js
│ └── todosActions.js
│
└── filter/
├── filterReducer.js
└── filterActions.js

---

# Как работает Redux в проекте

Redux хранит глобальное состояние приложения в store.

Состояние разделено на 2 части:

```js
state = {
  todos: {
    items: [],
  },

  filter: {
    value: 'all',
  },
};
```

````

---

# store.js

Файл store.js создает Redux store через configureStore.

```js
import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './todo/todoReducer';
import { filterReducer } from './filter/filterReducer';

export default configureStore({
  reducer: {
    todos: todoReducer,
    filter: filterReducer,
  },
});
```

---

# createAction

В Redux Toolkit actions создаются через createAction.

```js
import { createAction } from '@reduxjs/toolkit';

export const addTodo = createAction('todos/add');
```

createAction автоматически создает action creator.

---

# Как выглядит action

```js
addTodo('Изучить Redux Toolkit');
```

↓

```js
{
  type: 'todos/add',
  payload: 'Изучить Redux Toolkit'
}
```

---

# todosActions.js

Файл хранит actions для Todo.

```js
import { createAction } from '@reduxjs/toolkit';

export const addTodo = createAction('todos/add');
export const deleteTodo = createAction('todos/delete');
export const toggleTodo = createAction('todos/toggle');
```

---

# filterActions.js

Actions для фильтрации задач.

```js
import { createAction } from '@reduxjs/toolkit';

export const setFilter = createAction('filter/set');
```

---

# createReducer

Вместо switch/case используется createReducer.

```js
const todoReducer = createReducer(initialState, (builder) => {
  builder.addCase(addTodo, (state, action) => {
    state.items.push({
      id: Date.now(),
      text: action.payload,
      isCompleted: false,
    });
  });
});
```

---

# builder.addCase()

builder.addCase() обрабатывает определенный action.

```js
builder.addCase(addTodo, (state, action) => {});
```

Аналог классического Redux:

```js
case 'todos/add'
```

---

# Immer

Redux Toolkit использует Immer под капотом.

Благодаря этому можно писать код в стиле мутации state:

```js
state.items.push(newTodo);
```

Но Immer автоматически создает immutable state.

---

# todoReducer.js

Отвечает за:

- добавление задач
- удаление задач
- изменение статуса задачи

---

# Начальное состояние

```js
const initialState = {
  items: [],
};
```

---

# Добавление задачи

```js
builder.addCase(addTodo, (state, action) => {
  state.items.push({
    id: Date.now(),
    text: action.payload,
    isCompleted: false,
  });
});
```

---

# Удаление задачи

```js
builder.addCase(deleteTodo, (state, action) => {
  state.items = state.items.filter((todo) => todo.id !== action.payload);
});
```

---

# Изменение статуса задачи

```js
builder.addCase(toggleTodo, (state, action) => {
  const currentTodo = state.items.find((todo) => todo.id === action.payload);

  if (currentTodo) {
    currentTodo.isCompleted = !currentTodo.isCompleted;
  }
});
```

---

# filterReducer.js

Хранит текущий фильтр:

```js
'all';
'active';
'completed';
```

---

# Начальное состояние

```js
const initialState = {
  value: 'all',
};
```

---

# Изменение фильтра

```js
builder.addCase(setFilter, (state, action) => {
  state.value = action.payload;
});
```

---

# Подключение Redux к React

В main.jsx приложение оборачивается в Provider.

```js
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

Provider дает доступ ко всему Redux store внутри приложения.

---

# useSelector

useSelector используется для получения данных из store.

```js
const todos = useSelector((state) => state.todos.items);

const filter = useSelector((state) => state.filter.value);
```

---

# useDispatch

useDispatch используется для отправки actions в Redux.

```js
const dispatch = useDispatch();
```

---

# Dispatch Actions

## Добавление задачи

```js
dispatch(addTodo(todoText));
```

---

## Удаление задачи

```js
dispatch(deleteTodo(todoId));
```

---

## Изменение статуса

```js
dispatch(toggleTodo(todoId));
```

---

## Изменение фильтра

```js
dispatch(setFilter('completed'));
```

---

# useMemo

Для фильтрации задач используется useMemo.

```js
const filteredTodos = useMemo(() => {
  if (filter === 'active') {
    return todos.filter((el) => !el.isCompleted);
  }

  if (filter === 'completed') {
    return todos.filter((el) => el.isCompleted);
  }

  return todos;
}, [filter, todos]);
```

useMemo предотвращает лишние вычисления при ререндере компонента.

---

# Как работает Redux Flow

## 1. Компонент вызывает dispatch

```js
dispatch(addTodo('Изучить Redux Toolkit'));
```

↓

## 2. Action creator создает action

```js
{
  type: 'todos/add',
  payload: 'Изучить Redux Toolkit'
}
```

↓

## 3. Reducer обрабатывает action через addCase()

```js
builder.addCase(addTodo, ...)
```

↓

## 4. Immer создает новый immutable state

↓

## 5. Redux обновляет store

↓

## 6. React автоматически перерисовывает UI

---

# Преимущества Redux Toolkit

✅ Меньше boilerplate-кода
✅ Нет switch/case
✅ Упрощенная работа с immutable state
✅ Более читаемый код
✅ Удобная архитектура
✅ Встроенный Immer
✅ Современный Redux-подход

---
````
