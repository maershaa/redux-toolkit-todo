1. создали папку проекта
2. В терминале установили -
   npm create vite@latest . -- --template react
3. Затем установите базовые зависимости:
   npm install

4. Теперь устанавливаем redux toolkit
   npm install @reduxjs/toolkit react-redux

5. В src создаем папку redux а в ней - store.js
   import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
reducer: {
counter: counerReducer (функция которая принимает текущее состояние и объект, решает, как обновить состояние при необходимости, и возвращает новое состояние)
},
})

6.  вам следует начать с того, чтобы обернуть все ваше приложение в <Provider>компонент, чтобы сделать хранилище доступным для всего дерева компонентов:
    <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
    </StrictMode>,

7.  создаем сам store в отдельном файле и оттуда импортируем в корень проекта и передаем в провайдер.
    const store = createStore(rootReducer)

После этого используя useSelector() вы можете извлекать любые данные из store и использовать их в своих функциональных компонентах.

8.useSelector()
Позволяет извлекать данные из состояния хранилища Redux для использования в этом компоненте с помощью функции-селектора.

import { useSelector } from 'react-redux'

export const CounterComponent = () => {
const counter = useSelector((state) => state.counter) //достаем значение counter из общего store который передан в Provider

return <div>{counter}</div>
}

8.  Архитектура при Redux Toolkit базовый урвоень или как лучше назвать =>
    src/
    redux/
    store.js # Глобальная настройка store
    todos/
    todosReducer.js # Редьюсер и начальное состояние для задач
    todosActions.js # (Опционально) экшены, если их много
    filter/
    filterReducer.js # Редьюсер для фильтра
    components/
    App.jsx

        9.


        -------------------------
        ---------------------
        ------------

        ````md

# React + Redux Toolkit — Базовая настройка проекта

Краткая инструкция по созданию проекта с Redux Toolkit и React Redux.

---

# 1. Создаем папку проекта

```bash
mkdir my-app
cd my-app
```

---

# 2. Создаем React проект через Vite

```bash
npm create vite@latest . -- --template react
```

---

# 3. Устанавливаем базовые зависимости

```bash
npm install
```

---

# 4. Устанавливаем Redux Toolkit и React Redux

```bash
npm install @reduxjs/toolkit react-redux
```

---

# 5. Создаем папку redux и store.js

Структура:

```txt
src/
  redux/
    store.js
```

---

# store.js

```js
import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counter/counterReducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

## Что такое reducer

Reducer — это функция, которая:

- принимает текущее состояние (state)
- принимает action
- решает, как обновить состояние
- возвращает новый state

---

# 6. Подключаем Provider

Redux store нужно передать всему приложению через Provider.

main.jsx:

```js
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
```

---

# 7. Создаем reducer

Структура:

```txt
src/
  redux/
    counter/
      counterReducer.js
```

---

# Пример reducer

```js
const initialState = {
  value: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'counter/increment':
      return {
        ...state,
        value: state.value + 1,
      };

    case 'counter/decrement':
      return {
        ...state,
        value: state.value - 1,
      };

    default:
      return state;
  }
};

export { counterReducer };
```

---

# 8. useSelector()

useSelector позволяет получать данные из Redux store.

```js
import { useSelector } from 'react-redux';

export const CounterComponent = () => {
  const counter = useSelector((state) => state.counter.value);

  return <div>{counter}</div>;
};
```

## Как это работает

```js
state.counter.value;
```

- state — весь Redux store
- counter — slice из store
- value — конкретное значение

---

# 9. useDispatch()

useDispatch позволяет отправлять actions в Redux.

```js
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();
```

---

# Пример dispatch

```js
dispatch({
  type: 'counter/increment',
});
```

Action отправляется в reducer, после чего Redux обновляет state.

---

# 10. Redux Flow

## 1. Компонент вызывает dispatch

```js
dispatch({
  type: 'counter/increment',
});
```

↓

## 2. Action попадает в reducer

```js
case 'counter/increment'
```

↓

## 3. Reducer возвращает новый state

```js
return {
  ...state,
  value: state.value + 1,
};
```

↓

## 4. Redux обновляет store

↓

## 5. React автоматически обновляет UI

---

# 11. Базовая архитектура Redux Toolkit проекта

```txt
src/
  redux/
    store.js

    todos/
      todosReducer.js
      todosActions.js

    filter/
      filterReducer.js

  components/
    App.jsx
```

---

# Что обычно хранится в redux/

## store.js

Глобальная настройка Redux store.

---

## reducers

Содержат:

- initialState
- switch/case
- логику обновления state

---

## actions (опционально)

Используются, если actions становятся большими или повторяются.

---

# Что важно понять новичку

Redux строится вокруг 3 основных вещей:

## Store

Глобальное хранилище состояния приложения.

---

## Actions

Объекты, описывающие, ЧТО произошло.

```js
{
  type: 'todos/add',
  payload: 'Изучить Redux'
}
```

---

## Reducers

Функции, которые решают, как обновить state.

---

# Immutable update

Redux state нельзя изменять напрямую.

❌ Неправильно:

```js
state.value++;
```

✅ Правильно:

```js
return {
  ...state,
  value: state.value + 1,
};
```

---

```

```
