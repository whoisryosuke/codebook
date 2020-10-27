---
id: redux
title: Using Redux in React
sidebar_label: Redux
---

# Redux Toolkit

Redux Toolkit is an opinionated set of functions that simplify the process of setting up Redux in your app (from the store, to the actions, to the reducers — all simplified). One of the major issues with Redux is the amount of boilerplate required in order to complete basic task. This library resolves this by using functions like `createStore` or `createSlice` to define Redux state.

## Quick Start

```jsx
npx create-react-app my-app --template redux
```

This will install a project using Create React App with the Redux template, which now uses the Redux toolkit by default.

### Existing apps

```bash
# NPM
npm install @reduxjs/toolkit

# Yarn
yarn add @reduxjs/toolkit
```

This package only requires `react-redux` (as well as `react`). You can remove `redux` from your dependencies (as well as other libraries included here, like `redux-thunk`). This package includes `redux`.

1. Create a store using `configureStore()`:

   ```jsx
   import { configureStore } from "@reduxjs/toolkit";
   import counterReducer from "../features/counter/counterSlice";

   export default configureStore({
     reducer: {
       counter: counterReducer,
     },
   });
   ```

2. Wrap app in store:

   ```jsx
   import React from "react";
   import App from "./App";
   import store from "./app/store";
   import { Provider } from "react-redux";

   ReactDOM.render(
     <React.StrictMode>
       <Provider store={store}>
         <App />
       </Provider>
     </React.StrictMode>,
     document.getElementById("root")
   );
   ```

3. Create reducer (includes actions) using `createSlice()`:

   ```jsx
   import { createSlice } from "@reduxjs/toolkit";

   // Define the name, initialState, and reducers
   export const counterSlice = createSlice({
     name: "counter",
     initialState: {
       value: 0,
     },
     reducers: {
       increment: (state) => {
         // Redux Toolkit allows us to write "mutating" logic in reducers. It
         // doesn't actually mutate the state because it uses the Immer library,
         // which detects changes to a "draft state" and produces a brand new
         // immutable state based off those changes
         state.value += 1;
       },
       decrement: (state) => {
         state.value -= 1;
       },
       incrementByAmount: (state, action) => {
         state.value += action.payload;
       },
     },
   });

   // You can export the actions for convenience
   export const {
     increment,
     decrement,
     incrementByAmount,
   } = counterSlice.actions;

   // The function below is called a thunk and allows us to perform async logic. It
   // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
   // will call the thunk with the `dispatch` function as the first argument. Async
   // code can then be executed and other actions can be dispatched
   export const incrementAsync = (amount) => (dispatch) => {
     setTimeout(() => {
       dispatch(incrementByAmount(amount));
     }, 1000);
   };

   // The function below is called a selector and allows us to select a value from
   // the state. Selectors can also be defined inline where they're used instead of
   // in the slice file. For example: `useSelector((state) => state.counter.value)`
   export const selectCount = (state) => state.counter.value;

   // Make sure to export the reducer to import into the store
   export default counterSlice.reducer;
   ```

4. Use it in your component. Dispatch actions by using the `useDispatch` hook, and if you defined a selector, you can access it using `useSelector`.

   ```jsx
   import React, { useState } from "react";
   import { useSelector, useDispatch } from "react-redux";
   import {
     decrement,
     increment,
     incrementByAmount,
     incrementAsync,
     selectCount,
   } from "./counterSlice";
   import styles from "./Counter.module.css";

   export function Counter() {
     const count = useSelector(selectCount);
     const dispatch = useDispatch();
     const [incrementAmount, setIncrementAmount] = useState("2");

     return (
       <div>
         <div className={styles.row}>
           <button
             className={styles.button}
             aria-label="Increment value"
             onClick={() => dispatch(increment())}
           >
             +
           </button>
           <span className={styles.value}>{count}</span>
           <button
             className={styles.button}
             aria-label="Decrement value"
             onClick={() => dispatch(decrement())}
           >
             -
           </button>
         </div>
         <div className={styles.row}>
           <input
             className={styles.textbox}
             aria-label="Set increment amount"
             value={incrementAmount}
             onChange={(e) => setIncrementAmount(e.target.value)}
           />
           <button
             className={styles.button}
             onClick={() =>
               dispatch(incrementByAmount(Number(incrementAmount) || 0))
             }
           >
             Add Amount
           </button>
           <button
             className={styles.asyncButton}
             onClick={() =>
               dispatch(incrementAsync(Number(incrementAmount) || 0))
             }
           >
             Add Async
           </button>
         </div>
       </div>
     );
   }
   ```

## API

Redux Toolkit includes these APIs:

- `[configureStore()](https://redux-toolkit.js.org/api/configureStore)`: wraps `createStore` to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes `redux-thunk` by default, and enables use of the Redux DevTools Extension.
- `[createReducer()](https://redux-toolkit.js.org/api/createReducer)`: that lets you supply a lookup table of action types to case reducer functions, rather than writing switch statements. In addition, it automatically uses the `[immer` library](https://github.com/immerjs/immer) to let you write simpler immutable updates with normal mutative code, like `state.todos[3].completed = true`.
- `[createAction()](https://redux-toolkit.js.org/api/createAction)`: generates an action creator function for the given action type string. The function itself has `toString()` defined, so that it can be used in place of the type constant.
- `[createSlice()](https://redux-toolkit.js.org/api/createSlice)`: accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.
- `[createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)`: accepts an action type string and a function that returns a promise, and generates a thunk that dispatches `pending/fulfilled/rejected` action types based on that promise
- `[createEntityAdapter](https://redux-toolkit.js.org/api/createEntityAdapter)`: generates a set of reusable reducers and selectors to manage normalized data in the store
- The `[createSelector` utility](https://redux-toolkit.js.org/api/createSelector) from the [Reselect](https://github.com/reduxjs/reselect) library, re-exported for ease of use.

# References

## Redux Toolkit

[Redux Toolkit: Overview | Redux](https://redux.js.org/redux-toolkit/overview)

[Quick Start | Redux Toolkit](https://redux-toolkit.js.org/introduction/quick-start)

[Basic Tutorial | Redux Toolkit](https://redux-toolkit.js.org/tutorials/basic-tutorial)

[@reduxjs/toolkit@1.4.0 ❘ BundlePhobia](https://bundlephobia.com/result?p=@reduxjs/toolkit@1.4.0)

### Examples

[Redux Toolkit Example - Toggle (On/Off)](https://codesandbox.io/s/redux-toolkit-example-toggle-onoff-goxfh?file=/src/App.js)
