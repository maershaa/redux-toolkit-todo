# Todo List — Classic Redux Architecture

Учебный проект Todo List, чтобы разобраться в базовой архитектуре Redux, реализованный с использованием классического Redux-подхода:

- configureStore
- reducers
- switch/case
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

# Структура проекта

src/
│
├── redux/
│ ├── store.js
│ │
│ ├── todo/
│ │ └── todoReducer.js
│ │
│ └── filter/
│ └── filterReducer.js

---

# Как работает Redux в проекте

Redux хранит глобальное состояние приложения в store.

В этом проекте состояние разделено на 2 части:

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

# todoReducer.js

Отвечает за:

- добавление задач
- удаление задач
- изменение статуса задачи

Используется классический Redux-подход через switch/case.

_Начальное состояние_

```js
const initialState = {
  items: [],
};
```

---

_Добавление задачи_

```js
case 'todos/add'
```

Создает новый объект задачи и добавляет его в массив.

---

_Переключение статуса задачи_

```js
case 'todos/toggle'
```

Меняет:

```js
isCompleted: true <-> false
```

---

_Удаление задачи_

```js
case 'todos/delete'
```

Удаляет задачу через filter().

---

# filterReducer.js

Хранит текущий фильтр:

```js
'all';
'active';
'completed';
```

_Начальное состояние_

```js
const initialState = {
  value: 'all',
};
```

---

_Изменение фильтра_

```js
case 'filter/set'
```

Обновляет текущее значение фильтра.

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
dispatch({
  type: 'todos/add',
  payload: todoText,
});
```

---

## Удаление задачи

```js
dispatch({
  type: 'todos/delete',
  payload: todoId,
});
```

---

## Изменение статуса

```js
dispatch({
  type: 'todos/toggle',
  payload: todoId,
});
```

---

## Изменение фильтра

```js
dispatch({
  type: 'filter/set',
  payload: 'completed',
});
```

---

# Как работает Redux Flow

## 1. Компонент вызывает dispatch

```js
dispatch({
  type: 'todos/add',
  payload: 'Изучить Redux',
});
```

↓

## 2. Action попадает в reducer

```js
case 'todos/add'
```

↓

## 3. Reducer создает новый state

```js
return {
  ...state,
  items: [...state.items, newTodo],
};
```

↓

## 4. Redux обновляет store

↓

## 5. React автоматически перерисовывает UI

---

# Почему используется immutable update

Redux state нельзя изменять напрямую.

❌ Неправильно:

```js
state.items.push(newTodo);
```

✅ Правильно:

```js
items: [...state.items, newTodo];
```

Это позволяет Redux правильно отслеживать изменения.

---

```

```
