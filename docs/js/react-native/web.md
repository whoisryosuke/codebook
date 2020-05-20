---
id: web
title: React Native Web
sidebar_label: React Native Web
---

# [Github](https://github.com/necolas/react-native-web)

# 📚 [Documentation](http://necolas.github.io/react-native-web/docs/?path=/docs/overview-getting-started--page)

## 🎮 [CodeSandbox Template](https://codesandbox.io/s/q4qymyp2l6)

## **Integrations**

Examples of using React Native for Web with other web tools:

- [Docz](https://github.com/doczjs/docz/tree/master/examples/react-native)
- [Gatsby](https://github.com/slorber/gatsby-plugin-react-native-web)
- [Next.js](https://github.com/zeit/next.js/tree/master/examples/with-react-native-web) (and [example recipes](https://gist.github.com/necolas/f9034091723f1b279be86c7429eb0c96))
- [Phenomic](https://github.com/phenomic/phenomic/tree/master/examples/react-native-web-app)
- [Razzle](https://github.com/jaredpalmer/razzle/tree/master/examples/with-react-native-web)
- [Storybook](https://github.com/necolas/react-native-web/tree/master/packages/docs/)
- [Styleguidist](https://github.com/styleguidist/react-styleguidist/tree/master/examples/react-native)

# Getting Started

## Install

```bash
npm install react react-dom react-native-web
```

Your application may need to polyfill `Promise`, `Object.assign`, `Array.from`, and `[ResizeObserver](https://github.com/que-etc/resize-observer-polyfill)` as necessary for your desired browser support.

## Recommended starter kits

### Expo

[Expo](https://expo.io/) is a framework and a platform for universal React applications. It is simple to setup, optimizes the web build, and provides dozens of additional cross-platform APIs. 

🏃‍♂️Install and run `expo start --web`.

📖 [Expo guide on react-native-web](https://docs.expo.io/versions/latest/guides/running-in-the-browser/?redirected)

Starting in Expo v33, projects bootstrapped with the Expo CLI **will have web support from the start**. No need to install yourself unless it's an older project.

To add web support to an existing Expo app you can do the following:

```bash
npm install expo-cli --global
expo init my-app
cd my-app
yarn add react-native-web@0.11.7 react-dom
expo start --web
```

Ensure your project has at least expo@^33.0.0 installed.

### Create React App

[Create React App](https://github.com/facebook/create-react-app) is a good way to setup a simple, web-only React app with built-in support for aliasing `react-native-web` to `react-native`.

```bash
npx create-react-app my-app
cd my-app
npm install react-native-web
npm start
```

## Standalone configurations

### Configuring a module bundler

If you have a custom setup, you may choose to configure your module bundler to alias the package to `react-native`.

For example, modify your [webpack](https://github.com/webpack/webpack) configuration as follows:

```jsx
// webpack.config.js
module.exports = {
  // ...the rest of your config

  resolve: {
    alias: {
      'react-native$': 'react-native-web'
    }
  }
}
```

### Configuring Babel

[Babel](https://babeljs.io/) supports module aliasing using [babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver)

```jsx
{
  "plugins": [
    ["module-resolver", {
      "alias": {
        "^react-native$": "react-native-web"
      }
    }]
  ]
}
```

### Configuring Jest

[Jest](https://facebook.github.io/jest/) can be configured using the provided preset. This will map `react-native` to `react-native-web` and provide appropriate mocks:

```json
{
  "preset": "react-native-web"
}
```

Please refer to the Jest documentation for more information.

### Configuring Node.js

Node.js can alias `react-native` to `react-native-web` using `[module-alias](https://www.npmjs.com/package/module-alias)`. This is useful if you want to pre-render the app (e.g., server-side rendering or build-time rendering).

```jsx
// Install the `module-alias` package as a dependency first
const moduleAlias = require("module-alias");
moduleAlias.addAliases({
  "react-native": require.resolve("react-native-web"),
});
moduleAlias();
```

# References

- [Getting started with React Native Web and React Native Elements](https://react-native-elements.github.io/react-native-elements/blog/2018/12/13/react-native-web.html)
- [create-react-native-web-app](https://github.com/orYoffe/create-react-native-web-app)