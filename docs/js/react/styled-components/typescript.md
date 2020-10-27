---
id: typescript
title: Typescript & Styled Components
sidebar_label: Typescript
---

## Theme Typing

```ts
// JS reimplementation of Style Closet scales for use in styled-components
const colors = {
  blue: "#2179ee",
  green: "#00cc9a",
  coral: "#ff6759",
  gold: "#f0b95b",
  purple: "#7537ef",
  white: "#ffffff",
  black: "#000000",

  grey10: "#f3f4f8",
  grey20: "#e1e5eb",
  grey30: "#c2c6cc",
  grey40: "#9ea2a8",
  grey50: "#686c73",
  grey60: "#30363d",
};

const secondaryColors = {
  blue10: "#ade7ff",
  blue20: "#61bcff",
  blue30: "#2179ee",
  blue40: "#1f4ab4",
  blue50: "#1d2064",
  green10: "#b5ffcb",
  green20: "#5dffa3",
  green30: "#00cc9a",
  green40: "#219a8a",
  green50: "#183f51",
  purple10: "#dec7ff",
  purple20: "#a673ff",
  purple30: "#7537ef",
  purple40: "#4e23b6",
  purple50: "#2d1b64",
  coral10: "#ffc6b3",
  coral20: "#ff8e75",
  coral30: "#ff6759",
  coral40: "#eb312a",
  coral50: "#7b1e30",
  gold10: "#ffedc2",
  gold20: "#ffda8b",
  gold30: "#f0b95b",
  gold40: "#e5a229",
  gold50: "#6a4a24",
};

const breakpoints = ["31.25em", "43.75em", "46.875em"];
const fontSizes = [
  "1.2rem",
  "1.4rem",
  "1.6rem",
  "1.8rem",
  "2.4rem",
  "2.8rem",
  "3.2rem",
  "4.0rem",
  "4.8rem",
  "6.4rem",
];
const space = [
  "0",
  ".4rem",
  ".8rem",
  "1.2rem",
  "1.6rem",
  "2.0rem",
  "3.2rem",
  "4.8rem",
  "6.4rem",
  "9.6rem",
];

interface StyleClosetTheme {
  breakpoints: string[];
  fontSizes: string[];
  space: string[];
  colors: { [key in keyof typeof colors]: string };
  secondaryColors: { [key in keyof typeof secondaryColors]: string };
}

const theme: StyleClosetTheme = {
  breakpoints,
  fontSizes,
  space,
  colors,
  secondaryColors,
};

export { theme, StyleClosetTheme };
```

# Tips

## [Adding type declarations to a theme:](https://styled-components.com/docs/api#create-a-declarations-file)

Create a file named `styled.d.ts` somewhere in the project with the following code:

```tsx
// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
    };
  }
}
```

Or you can import the theme interface:

```tsx
// import original module declarations
import 'styled-components'
import {DefaultTheme} from "../theme/theme-types"

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme
}
```

### **Create a theme**

Now we can create a theme just by using the DefaultTheme declared at the step above.

```jsx
// my-theme.ts
import { DefaultTheme } from "styled-components";

const myTheme: DefaultTheme = {
  borderRadius: "5px",

  colors: {
    main: "cyan",
    secondary: "magenta",
  },
};

export { myTheme };
```

## [Adding types for custom props:](https://styled-components.com/docs/api#using-custom-props)

If you wanted to use a `primary` prop inside the Styled Component, you can define the type, then pass it to the function:

```tsx
type ButtonProps = {
  primary: boolean;
};

const Button = styled.TouchableOpacity<ButtonProps>`
  opacity: ${(props) => (props.primary ? 0.5 : 1)};
`;
```

Here's an HTML/non-native version:

```tsx
interface TitleProps {
  readonly isActive: boolean;
}

const Title = styled.h1<TitleProps>`
  color: ${(props) =>
    props.isActive ? props.theme.colors.main : props.theme.colors.secondary};
`;
```

Or with the custom component API with inline type:

```tsx
const NewHeader = styled(Header)<{ customColor: string }>`
  color: ${(props) => props.customColor};
`;
```

Or with custom component API with interface:

```tsx
interface NewHeaderProps {
  readonly customColor: string;
}

const NewHeader = styled(Header)<NewHeaderProps>`
  color: ${(props) => props.customColor};
`;
```

# References

- [https://blog.bitsrc.io/tips-for-using-typescript-with-styled-components-e5398755997f](https://blog.bitsrc.io/tips-for-using-typescript-with-styled-components-e5398755997f)
- [https://styled-components.com/docs/api#using-custom-props](https://styled-components.com/docs/api#using-custom-props)
