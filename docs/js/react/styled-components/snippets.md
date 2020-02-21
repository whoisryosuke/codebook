---
id: snippets
title: Snippets
sidebar_label: Snippets
---

# Configuration

## Webpack

How to add relative aliasing (@component/Button vs '../../component/Button`)

`.storybook/webpack.config.js`:

```js
const path = require("path");

module.exports = ({ config, mode }) => {
  // Adds absolute paths to imports
  config.resolve.alias = {
    ...config.resolve.alias,
    "@components": path.resolve(__dirname, "../src/components"),
    "@assets": path.resolve(__dirname, "../src/assets"),
    "@helpers": path.resolve(__dirname, "../src/helpers"),
    "@layouts": path.resolve(__dirname, "../src/layouts"),
    "@templates": path.resolve(__dirname, "../src/templates")
  };

  return config;
};
```

# Snippets

## Theming

### Get Theme Value

Get Theme Value function

```js
export const is = n => n !== undefined && n !== null;

export const get = (from, path) => {
  const paths = String(path).split(".");
  const pathsLength = paths.length;
  let result = from;
  for (let i = 0; i < pathsLength; i += 1) {
    if (result === undefined) return result;
    const path = paths[i];
    result = is(result[path]) ? result[path] : undefined;
  }
  return result;
};

export function cascade(value, arg) {
  if (typeof value === "function") {
    return cascade(value(arg), arg);
  }
  return value;
}

// Example use: getThemeValue(props, path)
// ------------ path = top level theme property (color, spacing, etc)
// ------------ e.g. theme = { color: { primary: 'blue' }, spacing: [] }
// ------------ getThemeValue(props, 'colors.primary')
export const getThemeValue = (props, path, initial = props.theme) =>
  cascade(get(initial, path), props);
```

[Reference/Credit](https://github.com/smooth-code/xstyled/blob/master/packages/util/src/index.js)

### Theme Switcher using React Context

Context API example with reducers (like Redux) to switch between theme options.

```js
import React from "react";
// This is a wrapper for Styled Component's <ThemeProvider>
// Creates and passes context to the SC component
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
