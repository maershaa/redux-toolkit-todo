# VITE-REACT-REDUX-TODO

Учебный проект Todo List, реализованный на React + Redux Toolkit с классическим Redux-подходом (switch/case) и разделением логики на actions, reducers и store.

В дальнейшем проект расширяется через отдельные ветки с разными подходами Redux:

- createReducer
- createSlice

---

# 🚀 Возможности проекта

- Добавление задач
- Удаление задач
- Отметка выполнения задач
- Фильтрация задач:
  - All
  - Active
  - Completed

---

# 🧠 Используемый подход

В этом проекте реализован **классический Redux-подход**:

- configureStore
- reducers (switch/case)
- actions вынесены в отдельные файлы
- useSelector / useDispatch
- immutable state updates

---

# 📁 Структура проекта

```txt
VITE-REACT-REDUX-TODO/
├── dist/
├── node_modules/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── assets/
│   │   └── styles/
│   │       └── index.css
│   │
│   └── redux/
│       ├── store.js
│       │
│       ├── todo/
│       │   ├── todoReducer.js
│       │   └── todosActions.js
│       │
│       └── filter/
│           ├── filterReducer.js
│           └── filterActions.js
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

````

---

# 🗄️ Redux State Structure

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

---

# ⚙️ store.js

Конфигурация Redux store через `configureStore`.

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

# 🧩 Reducers

## todoReducer.js

Отвечает за:

- добавление задач
- удаление задач
- переключение статуса

Использует `switch/case` и immutable update.

---

## filterReducer.js

Управляет текущим фильтром задач:

- all
- active
- completed

---

# 🎯 Actions (вынесены отдельно)

## todosActions.js

```js
export const addTodo = (text) => ({
  type: 'todos/add',
  payload: text,
});

export const deleteTodo = (id) => ({
  type: 'todos/delete',
  payload: id,
});

export const toggleTodo = (id) => ({
  type: 'todos/toggle',
  payload: id,
});
```

---

## filterActions.js

```js
export const setFilter = (value) => ({
  type: 'filter/set',
  payload: value,
});
```

---

# ⚛️ React подключение Redux

## main.jsx

```js
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '../redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

---

# 📦 Работа с состоянием

## useSelector

```js
const todos = useSelector((state) => state.todos.items);
const filter = useSelector((state) => state.filter.value);
```

---

## useDispatch

```js
const dispatch = useDispatch();
```

---

# 🧾 Dispatch Actions

## Добавить задачу

```js
dispatch(addTodo(todoText));
```

---

## Удалить задачу

```js
dispatch(deleteTodo(id));
```

---

## Переключить статус

```js
dispatch(toggleTodo(id));
```

---

## Изменить фильтр

```js
dispatch(setFilter('active'));
```

---

# 🔄 Redux Flow

1. UI вызывает dispatch
2. action попадает в reducer
3. reducer возвращает новый state
4. store обновляется
5. React перерисовывает UI

---

# 🧠 Почему Redux immutable

❌ Нельзя:

```js
state.items.push(todo);
```

✅ Нужно:

```js
items: [...state.items, todo];
```
````
