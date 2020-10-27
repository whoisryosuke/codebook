---
id: setup
title: Setting up React Native projects
sidebar_label: setup
---

# Linting

```tsx
yarn add --dev eslint prettier @react-native-community/eslint-config
```

Create a ESLint config that extends from this config:

```tsx
module.exports = {
  root: true,
  extends: ["@react-native-community"],
};
```

Then install a config to fix Prettier and ESLint from clashing (e.g. single quote vs double quote rules):

```tsx
yarn add --dev eslint-config-prettier
```

```tsx
module.exports = {
  root: true,
  extends: ["@react-native-community", "prettier"],
};
```

[@react-native-community/eslint-config](https://www.npmjs.com/package/@react-native-community/eslint-config)

- Best config for ESLint

[prettier/eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)

- Allows for easier import/exports

## Accessibility (a11y) Linting

```tsx
yarn add eslint-plugin-react-native-a11y --dev
```

Create an ESLint config that uses the plugin:

```tsx
// .eslintrc.js

module.exports = {
  root: true,
  extends: ["@react-native-community", "plugin:react-native-a11y/ios"],
};
```

[FormidableLabs/eslint-plugin-react-native-a11y](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y)

# Testing

## [Jest (Unit)](https://docs.expo.io/guides/testing-with-jest/)

```jsx
yarn add jest-expo react-test-renderer --dev
```

Then we need to add/update `package.json` to include:

```json
"scripts": {
  ...
  "test": "jest"
},
"jest": {
  "preset": "jest-expo",
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)"
  ]
}
```

Create a test, in this case for our main App entrypoint (`App.test.tsx`):

```tsx
import React from "react";
import renderer from "react-test-renderer";

import App from "./App";

describe("<App />", () => {
  // Unit test
  it("has 1 child", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  // Snapshot testing
  it("renders correctly", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

You should see the following in the console:

```tsx
$ jest
Expected react-native/jest-preset to define transform[^.+\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$]
react-native/jest-preset contained different transformIgnorePatterns than expected
 PASS  ./App.test.tsx
  <App />
    ✓ has 1 child (56ms)
    ✓ renders correctly (23ms)

 › 1 snapshot written.
Snapshot Summary
 › 1 snapshot written from 1 test suite.

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   1 written, 1 total
Time:        2.558s, estimated 14s
Ran all test suites.
✨  Done in 4.43s.
```

[Testing with Jest](https://docs.expo.io/guides/testing-with-jest/)

[Build a simple component](https://www.learnstorybook.com/intro-to-storybook/react-native/en/simple-component/)

## Storybook

Tried using [the official Storybook guide](https://www.learnstorybook.com/intro-to-storybook/react-native/en/get-started/) and didn't work with my Expo setup (not managed). Found [this other guide in the Storybook repo](https://github.com/storybookjs/react-native/blob/master/app/react-native/docs/manual-setup.md), but it was missing some key setup instructions.

Ended up cloning [the Storybook example from the official Expo repo](https://github.com/expo/examples/tree/master/with-storybook).

[expo/examples](https://github.com/expo/examples/tree/master/with-storybook)

[whoisryosuke/expo-storybook](https://github.com/whoisryosuke/expo-storybook)

# Build Systems

## bob

[react-native-community/bob](https://github.com/react-native-community/bob)

The React Native docs recommend using bob, a build system built for React Native modules (like Bob the Builder — yes we have a CLI!). Normally you'd [use the bob CLI to bootstrap](https://github.com/react-native-community/bob#creating-a-new-project) your React Native package, but since we have a project setup using Expo, we have to do it manually.

Run the following in the root of the package:

```tsx
yarn add --dev @react-native-community/bob
```

Add an `index.ts` file that export all of your components (so bob can pick it up during the next CLI process). If you don't have a component, just create a quick sample one using `<Text>` component and export it from the `index.ts`.

Then run the initialization process:

```tsx
yarn bob init
```

This will walk you through some questions, like selecting a build output. I recommend using CommonJS, ESModules, and Typescript. Afterwards, the CLI will add the necessary configurations to the `package.json`

I tried running `yarn prepare` to run the build but it failed due to a couple errors. First I had to remove the `noEmit` from the Typescript config, since Expo set's it to `true` [by default to allow for Metro bundler to handle things](https://docs.expo.io/guides/typescript/#configuring-the-typescript-compiler) — but since we're using bob for production builds, which needs to use Typescripts `tsc` to compile code, we remove it. Also the `App.test.tsx` used by Expo getting picked up and throwing errors about missing types. I added it to the `exclude` property of the `tsconfig.json` to ensure they didn't get picked up:

```tsx
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "jsx": "react-native",
    "lib": ["dom", "esnext"],
    "moduleResolution": "node",
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "exclude": [
    "node_modules",
    "dist",
    "lib",
    "**/*.spec.ts",
    "**/*.stories.[tj]sx",
    "**/*.test.[tj]sx",
    "App.test.tsx",
    "App.tsx"
  ]
}
```

After this, running `yarn prepare` works:

```bash
Ryos-MacBook-Pro:restyle-ui ryo$ yarn prepare
yarn run v1.22.4
warning package.json: No license field
$ bob build
ℹ Building target commonjs
ℹ Cleaning up previous build at dist/commonjs
ℹ Compiling 4 files in components with babel
✓ Wrote files to dist/commonjs
ℹ Building target module
ℹ Cleaning up previous build at dist/module
ℹ Compiling 4 files in components with babel
✓ Wrote files to dist/module
ℹ Building target typescript
ℹ Cleaning up previous build at dist/typescript
ℹ Generating type definitions with tsc
✓ Wrote definition files to dist/typescript
✨  Done in 4.92s.
```

If you look at the Typescript folder in your preferred build directory, you can see all the types necessary for components and even the theme.

## Haul

[callstack/haul](https://github.com/callstack/haul)

# Documentation

## react-styleguidist

Here's the official example in the react-styleguidist repo:

[styleguidist/react-styleguidist](https://github.com/styleguidist/react-styleguidist/tree/master/examples/react-native)

[Here's a git issue discussing using Expo](https://github.com/styleguidist/react-styleguidist/issues/1513), and they let the person know that it does use Expo.

# References

[#1 Boilerplate - React Native Fashion](https://youtu.be/MqRnpUC4czs?list=PLUGDC1tkjMjdSuARJs7TyVthnfJrf0Jud)

[Storybook for React Native tutorial](https://www.learnstorybook.com/intro-to-storybook/react-native/en/get-started/)

[storybookjs/react-native](https://github.com/storybookjs/react-native/blob/master/app/react-native/docs/manual-setup.md)

[expo/examples](https://github.com/expo/examples/tree/master/with-storybook)
