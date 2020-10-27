---
id: differences-web
title: Differences Between Web
sidebar_label: Web Differences
---

> These are differences between standard web development using the HTML DOM. This is not to be confused with react-native-web, that has it's own differences that will also be touched on here, but not the core concept.

# Key Differences

- **No pixels on native**, so measurements are unitless and use DPI-based scaling. With react-native-web, it becomes pixels. So `40` in native is `40px` in web, but they won't be the same size depending on device.

  ```jsx
  const styles = StyleSheet.create({
    container: {
      padding: 40,
    },
    text: {
      fontSize: 12,
    },
  });
  ```

- **No scrolling without a component** (`<ScrollView>`, `<FlatList>`, or `<VirtualizedList>`). Unlike the web, if content overflows on page (goes past bottom or top), a scrollbar will not automatically appear on native devices. You must wrap overflow content in a scroll-based container (listed above).
- "**Pages**" are "**screens**". Unlike websites, which can make any number of pages, structured any way they please — native screens are built differently. They use a "**stack**" based navigation that groups screens together, representing what's currently available. Stacks can be nested inside other stacks, creating more complex navigation.

  - For example, in an app you could have a Timeline, Search, and Profile tabs on the bottom. That's the top level stack, made up of 3 more stacks. Then those 3 stacks have all the necessary screens for each page. So the Timeline stack has the "index" or first screen you see, as well as maybe the "single post" screen so a user can click a post and go to it.

    ```markdown
    BottomTabNavigation

    - Timeline stack
    - - Index (or "Timeline") screen
    - - Single post screen
    - Search stack
    - Profile stack

    DrawerNavigation

    - Sidebar menu
    ```

- **Text must be displayed in a `<Text>` component.** `<Text>` components must be nested inside a `<View>` component.
- `**<View>` components cannot use font/typography styles.** You must set any font styles (like `fontSize`) on the specific `<Text>` component. **Similarly, `<Text>` cannot use `<View>` styles\*\* (like `backgroundColor`) — but if you use react-native-web, if you apply any styles, they will appear here (but not on the native device). So it's best to avoid any container-based styling for text components.
- **Styles are scoped to the component.** This means you can't style nested components through a parent, you must style the nested child directly.
- **Interactions are touch-based and not click-based**. This means the core React Native components are built with `onPress` props, instead of `onClick`. This also means you get additional props, like `onHardPress`, to indicate a longer sustained press on something (aka "force press").
- **You can't use the same browser based APIs**, like [the drag and drop API.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) Instead, you have to leverage native APIs and modules.

## Same Stuff

- **You can use cookies and localStorage on native** (using native-specific APIs or libraries — just like you do to access browser-based APIs). Local storage can be done using `[AsyncStorage](https://github.com/react-native-community/async-storage)`. Here's [a library for cookies](https://github.com/react-native-community/cookies), but [it has issues with Expo.](https://github.com/expo/expo/issues/6756)

## Platform Specific Differences

- **iPhones (and other devices) have a notch that limits screen space.** React Native offers a `<SafeView>` component out of the box that detects the device and pads the content area appropriately. But it only works for iOS10 and above (and not Android), so it's recommended to use react-native-safe-area-context, a community library.
