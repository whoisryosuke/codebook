---
id: context
title: Context API
sidebar_label: Context
---

## Examples

### Basic Example

Simple example using Context API to pass a value down to a `<Context.Consumer>`. Context requires using a component's state to keep track of the context value when you want to change the context (like toggling a sidebar or changing the current user). You change the context value by updating the component's state, which is reflected in the `<Context.Provider>`, and passes it down to any child elements.

> Usually you wrap this logic up in a separate component that handles the state and wrapping with provider.

> Note that in this case, since we're wrapping the root of the app, it will refresh completely when the context is changed since the state is kept so high up in the tree.

```jsx
import React from 'react'

const Context = React.createContext();

const initialState = {
  value: 'foo'
}

const App = () => {
  const [state, updateState] = React.useState(initialState);

  return <Context.Provider value={ { value: state.value, updateState } }>
      <Context.Consumer>
          { props => // … custom components }
      </Context.Consumer>
  </Context.Provider>
};

export default App;
```

### Reducer / Redux-like

Uses a reducer to handle actions dispatched through Context API. Similar to Redux architecture.

In this example, we create a theme switcher with pre-determined options (light or dark).

`themeContext.js`:

```js
import React, { createContext, useContext, useReducer } from "react";
export const ThemeContext = createContext();
export const ThemeProvider = ({ reducer, initialState, children }) => (
  <ThemeContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ThemeContext.Provider>
);
export const useThemeValue = () => useContext(ThemeContext);
```

`themeProvider.js`:

```jsx
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { ThemeOptions, THEME_OPTIONS } from "../layouts/Theme";

export default ({ children }) => {
  const initialState = {
    theme: ThemeOptions.light,
    selectedTheme: "light"
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case THEME_OPTIONS.DARK:
        return {
          ...state,
          theme: ThemeOptions[THEME_OPTIONS.DARK],
          selectedTheme: THEME_OPTIONS.DARK
        };
      case THEME_OPTIONS.LIGHT:
        return {
          ...state,
          theme: ThemeOptions[THEME_OPTIONS.LIGHT],
          selectedTheme: THEME_OPTIONS.LIGHT
        };

      default:
        return state;
    }
  };
  return (
    <ThemeProvider initialState={initialState} reducer={reducer}>
      {children}
    </ThemeProvider>
  );
};
```
