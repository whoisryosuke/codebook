---
id: gotchas
title: Gotchas
---

## React context get wiped between screens

If you wrap two screens in the same context provider, unless you hydrate the context from local storage (and constantly sync it), the context gets wiped. Each screen is dismounted, which means the next screen gets remounted, causing the context provider to spin up new.

**To persist the context between screens**, you need to wrap the entire app in it (usually `App.tsx` in the root of an Expo project).

For example, here we wrap the app in an Apollo provider for GraphQL, and a theme provider.

```jsx
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

import ApolloProvider from "./components/ApolloProvider";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </PaperProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}
```

This is why you see everyone use a localized store in their apps (like Redux). Even if you separate all your context, it still exists in one place (unless it's only used by one screen, then it makes more sense).

## Text strings error - but all Text is in component

You'll see this error, maybe multiple times, crashing a screen:

```jsx
Invariant Violation: Text strings must be rendered within a <Text> component
```

But when you check every rendered component, they're wrapped in a `<Text>` component.

The issue? **Ternary operators.**

```jsx
// ❌ Don't do
widgetNumber === 10 && <MyComponent />;

// ✅ Works
widgetNumber === 10 ? <MyComponent /> : [];
```

[Invariant Violation: Text strings must be rendered within a component](https://stackoverflow.com/a/59108109)
