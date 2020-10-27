---
id: navigation
title: React Navigation
sidebar_label: Navigation (Routing)
---

React Navigation is one of the popular and commonly used routing libraries used for React Native. It allows you to set components as routes and navigate between them for native or web apps.

# 🚀[Getting Started](https://reactnavigation.org/docs/getting-started)

React Navigation comes bundled with solutions like Expo. Use the "managed" version when creating a new Expo project.

## Manual installation

```bash
npm install @react-navigation/native
```

Expo projects require extra dependencies (if you didn't create the project with routing):

```bash
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

Add this to the top of your `App.jsx` or `index.jsx` root file:

```jsx
import "react-native-gesture-handler";
```

Wrap the whole app in the `<NavigationController>` component:

```jsx
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```

## [Creating Routes](https://reactnavigation.org/docs/hello-react-navigation)

`createStackNavigator` is a function that returns an object containing 2 properties: `Screen` and `Navigator`. Both of them are React components used for configuring the navigator. The `Navigator` should contain `Screen` elements as its children to define the configuration for routes.

You use `Stack` to create routes using the `<Stack.Screen>` component inside the `<Stack.Navigator>` component.

```jsx
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Pass data to routes using options prop */}
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

This is all setup by Expo automatically if you picked the managed workflow with tabbed navigation.

The casing of the route name doesn't matter -- you can use lowercase home or capitalized Home, it's up to you. We prefer capitalizing our route names.

The only required configuration for a screen is the name and component props. You can read more about the other options available in the stack navigator reference.

### [Multiple Routes](https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab)

The way mobile navigation works, you often have a bottom tab navigation with all the primary screens, and each of those might have their own set of screens. For example, you could have a bottom tab with **Timeline**, **Search**, and **Profile** — and the **Timeline** screen will have an "index" that displays posts, but also have a "**single post**" when you click on a post. This "**single post**" still lives inside the first tab (**Timeline**).

The way you set this up with React Navigation is nesting Navigation stacks.

```tsx
export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Workout"
      barStyle={{ backgroundColor: colors.primary }}
    >
      {/* First Tab */}
      <BottomTab.Screen
        name="Workout"
        component={TabOneNavigator}
        options={{
          tabBarIcon: "plus",
        }}
      />
      {/* Second Tab */}
      <BottomTab.Screen
        name="Recovery"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: "heart",
        }}
      />
    </BottomTab.Navigator>
  );
}

// These are the "nested" screens in the first Tab
// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator
      screenOptions={{
        headerShown: false, // hides header in all nested screens
      }}
    >
      {/* "Index" screen for tab */}
      <TabOneStack.Screen
        name="SingleExercise"
        component={TabOneScreen}
        options={{ headerTitle: "Single Exercise" }}
      />
    </TabOneStack.Navigator>
  );
}
```

### Passing additional props

Sometimes we might want to pass additional props to a screen. We can do that with 2 approaches:

1. Use [React context](https://reactjs.org/docs/context.html) and wrap the navigator with a context provider to pass data to the screens (recommended).
2. Use a render callback for the screen instead of specifying a `component` prop:

   ```jsx
   <Stack.Screen name="Home">
     {(props) => <HomeScreen {...props} extraData={someData} />}
   </Stack.Screen>
   ```

Note: By default, React Navigation applies optimizations to screen components to prevent unnecessary renders. Using a render callback removes those optimizations. So if you use a render callback, you'll need to ensure that you use React.memo or React.PureComponent for your screen components to avoid performance issues.

## [Navigating between routes](https://reactnavigation.org/docs/navigating)

You can use the `navigation` prop, which is passed to each screen, to handle route changes using the `navigate()` function with the screen name (in this case "Details"):

```jsx
import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
```

### [Passing props to routes (aka query params)](https://reactnavigation.org/docs/params)

When you want to navigate to a new route, but also pass some data (like a post ID), you pass it in as the second parameter of the `navigate()` function. Similar to query parameters in the web, or smart slugs, where you send a user to a route or URL and provide data in the URL (like a post ID).

```jsx
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
```

It's recommended that the params you pass are JSON-serializable. That way, you'll be able to use state persistence and your screen components will have the right contract for implementing deep linking.

### Updating route params

You can also update the current route or screen's params by using the `navigation.setParams` function. Refer to the API reference for setParams for more details.

```jsx
function ProfileScreen({ navigation: { setParams } }) {
  render() {
    return (
      <Button
        onPress={() =>
          setParams({
            friends:
              route.params.friends[0] === 'Brent'
                ? ['Wojciech', 'Szymon', 'Jakub']
                : ['Brent', 'Satya', 'Michaś'],
            title:
              route.params.title === "Brent's Profile"
                ? "Lucy's Profile"
                : "Brent's Profile",
          })
        }
        title="Swap title and friends"
      />
    );
  }
}
```

### Initial props for routes

You can also pass a prop that serves as the default or "initial" props for the route, if none are passed to it during navigation.

```jsx
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  initialParams={{ itemId: 42 }}
/>
```

## Header

### Custom header

If you want to customize the top header provided by react-navigation, you can use the `screenOptions` prop to pass an object with a `header` property. Inside that you can pass a callback to be used as the header, as well as destructure necessary props like the `navigation`.

This example is for react-native-paper ([via](https://snack.expo.io/@react-native-paper/github.com-callstack-react-native-paper:example)):

```tsx
<Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ navigation, scene, previous }) => (
          <Appbar.Header>
            {previous ? (
              <Appbar.BackAction onPress={() => navigation.goBack()} />
            ) : (navigation as any).openDrawer ? (
              <Appbar.Action
                icon="menu"
                onPress={() =>
                  ((navigation as any) as DrawerNavigationProp<{}>).openDrawer()
                }
              />
            ) : null}
            <Appbar.Content title={scene.descriptor.options.title} />
          </Appbar.Header>
        ),
      }}
    >
```

### [Setting Header Properties via Screen](https://reactnavigation.org/docs/header-buttons/#header-interaction-with-its-screen-component)

In the custom header above, it works find until you need to use information from the screen (like activating a modal based on component state, or the user activating a sidebar unique to the page). You can pass functions in the screen's options property (like we pass the title above), but you don't get context to the page that way.

You can use the `setOptions` method on the `navigation` object passed to screens to update the screen options:

```tsx
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerTitle: (props) => <LogoTitle {...props} />,
        })}
      />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  return <Text>Count: {count}</Text>;
}
```

You can also use the `navigation` passed to each screens and it's `setParam` method to set a param on the screen that's accessible like the options.

```tsx
static navigationOptions = ({ navigation }) => {
    headerRight: navigation.state.params && navigation.state.params.headerRight
}

componentDidMount(){
     this.props.navigation.setParams({
            headerRight: (<TouchableOpacity onPress={this._headerRightPressed}></TouchableOpacity>)
     })
}
```

# 🗂 [Tab Navigation](https://reactnavigation.org/docs/tab-based-navigation)

React navigation offers support for creating tab navigation that often goes at the bottom of apps by installing the `bottom-tabs` library:

```jsx
npm install @react-navigation/bottom-tabs
```

Here's an example of creating two screens you can tab between:

```jsx
import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

[Try this example on Snack](https://snack.expo.io/?platform=android&name=Drawer%20navigation%20%7C%20React%20Navigation&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.8.0%2C%40react-navigation%2Fdrawer%40%5E5.9.0%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.16%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.16%2C%40react-navigation%2Fnative%40%5E5.7.3%2C%40react-navigation%2Fstack%40%5E5.9.0%2Creact-native-paper%40%5E4.0.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E3.0.2%2Creact-native-screens%40%5E2.9.0%2Creact-native-tab-view%40%5E2.15.1&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Ftab-based-navigation-minimal.js)

Expo's managed workflow for tabbed navigation offers this out of the box.

### Styling tab navigation

```jsx
// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from "react-native-vector-icons/Ionicons";

// (...)

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

[Try this example on Snack](https://snack.expo.io/?platform=android&name=Drawer%20navigation%20%7C%20React%20Navigation&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.8.0%2C%40react-navigation%2Fdrawer%40%5E5.9.0%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.16%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.16%2C%40react-navigation%2Fnative%40%5E5.7.3%2C%40react-navigation%2Fstack%40%5E5.9.0%2Creact-native-paper%40%5E4.0.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E3.0.2%2Creact-native-screens%40%5E2.9.0%2Creact-native-tab-view%40%5E2.15.1&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Ftab-based-navigation-icons.js)

Read the [full API reference](https://reactnavigation.org/docs/bottom-tab-navigator) for further information on `createBottomTabNavigator` configuration options.

### Adding badges to tab icons (like notifications)

Sometimes we want to add badges to some icons. You can use the `[tabBarBadge` option](https://reactnavigation.org/docs/bottom-tab-navigator#tabbarbadge) to do it:

```jsx
<Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 3 }} />
```

[Try this example on Snack](https://snack.expo.io/?platform=android&name=Drawer%20navigation%20%7C%20React%20Navigation&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.8.0%2C%40react-navigation%2Fdrawer%40%5E5.9.0%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.16%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.16%2C%40react-navigation%2Fnative%40%5E5.7.3%2C%40react-navigation%2Fstack%40%5E5.9.0%2Creact-native-paper%40%5E4.0.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E3.0.2%2Creact-native-screens%40%5E2.9.0%2Creact-native-tab-view%40%5E2.15.1&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Ftab-based-navigation-badges.js)

### Switching between tabs

Same API as the routes, use the `navigation.navigate()` method passed as a prop to each tab.

# 🗄 [Drawer Navigation](https://reactnavigation.org/docs/drawer-based-navigation)

React navigation provides a "sidebar" style menu component that the user can swipe out from the sides of the app.

[https://reactnavigation.org/assets/navigators/drawer/drawer.mov](https://reactnavigation.org/assets/navigators/drawer/drawer.mov)

Install the library:

```jsx
npm install @react-navigation/drawer
```

Basic example:

```jsx
import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

🔗[Try this example on Snack](https://snack.expo.io/?platform=android&name=Tab%20navigation%20%7C%20React%20Navigation&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.8.0%2C%40react-navigation%2Fdrawer%40%5E5.9.0%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.16%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.16%2C%40react-navigation%2Fnative%40%5E5.7.3%2C%40react-navigation%2Fstack%40%5E5.9.0%2Creact-native-paper%40%5E4.0.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E3.0.2%2Creact-native-screens%40%5E2.9.0%2Creact-native-tab-view%40%5E2.15.1&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Fdrawer-based-navigation.js)

Expo's managed workflow for tabbed navigation offers this out of the box.

## Opening and closing drawer

To open and close drawer, use the following helpers:

```jsx
navigation.openDrawer();
navigation.closeDrawer();
```

🔗[Try this example on Snack](https://snack.expo.io/?platform=android&name=Tab%20navigation%20%7C%20React%20Navigation&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.8.0%2C%40react-navigation%2Fdrawer%40%5E5.9.0%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.16%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.16%2C%40react-navigation%2Fnative%40%5E5.7.3%2C%40react-navigation%2Fstack%40%5E5.9.0%2Creact-native-paper%40%5E4.0.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E3.0.2%2Creact-native-screens%40%5E2.9.0%2Creact-native-tab-view%40%5E2.15.1&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Fdrawer-open-close-toggle.js)

If you would like to toggle the drawer you call the following:

```jsx
navigation.toggleDrawer();
```

🔗[Try this example on Snack](https://snack.expo.io/?platform=android&name=Tab%20navigation%20%7C%20React%20Navigation&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.8.0%2C%40react-navigation%2Fdrawer%40%5E5.9.0%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.16%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.16%2C%40react-navigation%2Fnative%40%5E5.7.3%2C%40react-navigation%2Fstack%40%5E5.9.0%2Creact-native-paper%40%5E4.0.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E3.0.2%2Creact-native-screens%40%5E2.9.0%2Creact-native-tab-view%40%5E2.15.1&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Fdrawer-open-close-toggle.js)

Each of these functions, behind the scenes, are simply dispatching actions:

```jsx
navigation.dispatch(DrawerActions.openDrawer());
navigation.dispatch(DrawerActions.closeDrawer());
navigation.dispatch(DrawerActions.toggleDrawer());
```

🔗[Try this example on Snack](https://snack.expo.io/?platform=android&name=Tab%20navigation%20%7C%20React%20Navigation&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.8.0%2C%40react-navigation%2Fdrawer%40%5E5.9.0%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.16%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.16%2C%40react-navigation%2Fnative%40%5E5.7.3%2C%40react-navigation%2Fstack%40%5E5.9.0%2Creact-native-paper%40%5E4.0.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E3.0.2%2Creact-native-screens%40%5E2.9.0%2Creact-native-tab-view%40%5E2.15.1&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Fdrawer-dispatch.js)

# Typescript

## Screens

### Navigation prop

You use the `StackNavigationProp` with the "param list" you provided the Navigator as a type, and the current screen.

```tsx
import { StackNavigationProp } from '@react-navigation/stack';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile' // current screen you're on
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen = (props: Props) =>
```

[React Navigation](https://reactnavigation.org/docs/typescript/#type-checking-screens)

# References

- [https://reactnavigation.org/docs/getting-started](https://reactnavigation.org/docs/getting-started)
