---
id: styling
title: Styling in React Native
sidebar_label: Styling
---

# Basics

## Button

Buttons can be "colored" using the `color` prop to change the background and/or text color (depending on the platform). On Android, it changes background. On iOS, it changes text color.

```tsx
<Button color="Red" title="Hello Button" />
```

**Android:**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/18f41c45-9182-43dc-9a64-ddc5ef1f57c5/Screen_Shot_2020-09-09_at_11.08.20_AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/18f41c45-9182-43dc-9a64-ddc5ef1f57c5/Screen_Shot_2020-09-09_at_11.08.20_AM.png)

**iOS:**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9b435e64-b029-4b7b-970e-a6c68495ac59/E3ED817B-B7E2-484A-9272-AC8558ACBADC.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9b435e64-b029-4b7b-970e-a6c68495ac59/E3ED817B-B7E2-484A-9272-AC8558ACBADC.png)

This means that if you want to create a cross-platform button that has uniform styling, you have to use the `<TouchableOpacity>` (or <`TouchableWithoutFeedback />` like Material Design, since they create their own feedback "ripple" effect).

## Typescript

### Typing style props

When making components, you often provide the user a prop (like `style`) to provide styles that can override the component's default styles.

```jsx
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle
} from 'react-native';

interface IProps {
  label: string;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const Button: React.SFC<IProps> = (props): JSX.Element => (
  <TouchableHighlight>
    <View style={[styles.button, props.buttonStyle]}>
```

[Stylesheets in React Native with TypeScript Revisited](https://medium.com/@zvona/stylesheets-in-react-native-with-typescript-revisited-6b4ba0a899d2)

# 3rd Party Libraries

## Using Styled Components

Install the standard Styled Components package:

```bash
yarn add styled-components
```

Then import from the native directory:

```jsx
import styled from "styled-components/native";

export const Text = styled.Text`
  color: red;
`;

export default Text;
```

[React Native Web - Styled Components Example](https://codesandbox.io/s/react-native-web-styled-components-example-f6l62?file=/src/App.js)

[Using Styled Components with Expo](https://docs.expo.io/guides/using-styled-components/)

## Using Styled System

Install Styled Components (see above), then install Styled System:

```bash
yarn add styled-system
```

Then you create a styled native component and add the system props:

```jsx
import styled from "styled-components/native";
import { space, layout, color } from "styled-system";

export const Text = styled.Text`
  ${space}
  ${layout}
  ${color}
`;

export default Text;
```

Keep in mind that you must obey React Native rules, so text must be in `<Text>` node, and text color styles applied to a container won't effect the nested text (so adding color props to a `<Box>` component is pointless).

It also seems like responsive breakpoints don't work. An element with the prop `<Box width={[1 / 2, 1 / 3, 1 / 4]}>` will only ever display `1/2` width - even if you resize the browser.

## Using Restyle (by Shopify)

[Using Restyle in React Native](https://www.notion.so/Using-Restyle-in-React-Native-80259389b74f4d4c99366f447cdf1192)

# References

- [https://docs.expo.io/guides/using-styled-components/](https://docs.expo.io/guides/using-styled-components/)
