---
id: android
title: Android - Platform Specifics
sidebar_label: Android
---

# ⚙️ Building / Deploying

## Enable Hermes for Performance Gains

Needs expanding. But speeds up app performance immensely, but requires heavy testing.

# 📦 3rd Party Modules

## Safe Area Inset

Wrap the contents of the App component with SafeAreaView from the [react-native-safe-area-view](https://github.com/react-navigation/react-native-safe-area-view) library. It is going to have a style prop with a flex of value 1 and another prop called forceInset. It’s important we add this, especially for some Android devices which might not behave as expected.

```jsx
// ... other import statements
import SafeAreaView from "react-native-safe-area-view";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
```

This is what happens when you don't pass the `forceInset` on Android devices:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1ccf6f3d-2082-4eca-a499-2e64b2124b81/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1ccf6f3d-2082-4eca-a499-2e64b2124b81/Untitled.png)

And with the forceInset prop applied:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6587a233-1835-4bac-a6a9-23928c981a9a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6587a233-1835-4bac-a6a9-23928c981a9a/Untitled.png)

[How to Animate a Header View on Scroll With React Native Animated](https://amanhimself.dev/blog/animate-header-view-on-scroll-with-react-native-animated-api?utm_campaign=React%2BNative%2BNow&utm_medium=email&utm_source=React_Native_Now_72)

Not sure if this applies to [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) — which is used by Expo out of the box.
