---
id: basics
title: React Native Basics
sidebar_label: Basics
---

# Quick start

## Using Expo

Expo is a framework built on top of React Native that allows you to more easily access native features, like the camera or accelerometer.

1. Install the Expo CLI:

```bash
npm install -g expo-cli
```

2. Create new project and boot dev server:

```bash
expo init AwesomeProject

cd AwesomeProject
npm start # you can also use: expo start
```

3. Open `App.js` to start editing your app.

To run the app on your phone, download the [Expo](https://expo.io/) client app on your iOS or Android phone and scan the QR code (for Android) or follow instructions (for iOS).

## Using react-native CLI

Use the `react-native` CLI and the `init` command to create a new project:

```tsx
npx react-native init YourProjectName
```

Make sure your project name is alphanumeric, and doesn't contain slashes or special characters.

The CLI will install the React Native template, dependencies, and optionally install necessary software like Cocoapods (for iOS).

If you don't have XCode installed, you will get errors for the Cocoapods install.

# Components

## `<View>`

Basically a `div`.

## `<Text>`

Basically a `p`.

### ⚠️ My text doesn't wrap!

Add `flex: 1` or `flexShrink: 1` to the Text style:

```jsx
<Text style={{ flex: 1 }}>
  Reallllllyyyy longgggggggggg multi-line textttttttttt
</Text>
```

[React native text going off my screen, refusing to wrap. What to do?](https://stackoverflow.com/questions/36284453/react-native-text-going-off-my-screen-refusing-to-wrap-what-to-do)

## `<Image>`

Like an `img` tag on the web, but with different attributes/props. Rather than `src` for the image URL, you use the `source` prop and pass it an object with a `uri` property.

```jsx
import React, { Component } from 'react';
import { Image } from 'react-native';

export default class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={pic} style={{width: 193, height: 110}}/>
    );
  }
```

Or you can import the image directly, using Webpack's `require()`:

```jsx
<Image source={require("./my-icon.png")} />
```

Also, if you have `my-icon.ios.png` and `my-icon.android.png`, the packager will pick the correct file for the platform. You can also use the `@2x` and `@3x` suffixes to provide images for different screen densities.

For example, this would be the structure for this component (`<Image source={require('./img/check.png')} />`):

```jsx
.
├── button.js
└── img
    ├── check.png
    ├── check.ios.png
    ├── check.android.png
    ├── check@2x.png
    └── check@3x.png
```

### ⚠️ My image doesn't show up!

Images need a set width and height to be visible, and for react-native-web, it must be applied to the styles (instead of using the width/height props).

Unlike the `<View>` component, you can't set `flex: 1` to easily fix this issue.

```jsx
// ❌ Wont display
<Image width={40} height={40} source={image} />

// ✅ Works
<Image source={image} style={{ width: 40, height: 40 }} />
```

## `<ImageBackground>`

Lets you display an image in the background, similar to the web, since it's not easy to achieve natively. Works similarly as the `<Image>` component, but displays children.

```jsx
return (
  <ImageBackground source={...} style={{width: '100%', height: '100%'}}>
    <Text>Inside</Text>
  </ImageBackground>
);
```

📖[Official docs for ImageBackground](https://reactnative.dev/docs/imagebackground)

## `<TextInput>`

Basically a `input`.

```jsx
<TextInput
  style={{ height: 40 }}
  placeholder="Type here to translate!"
  onChangeText={(text) => this.setState({ text })}
  value={this.state.text}
/>
```

📖 [Official docs on `<TextInput>`](https://reactnative.dev/docs/textinput)

## `<Button>`

Basically a touch-enabled `button` from the web. Uses `onPress` instead of `onClick` for handling touch events.

```jsx
<Button
  onPress={() => {
    alert("You tapped the button!");
  }}
  title="Press Me"
/>
```

Buttons can only be styled using the `color` prop, which changes the button's background color on iOS or text color on Android. [If you want to make a more custom button](https://stackoverflow.com/a/41754577), use the `<TouchableOpacity>` component (see below).

## "Touchable"

Basically like wrapping a `<div>` in a `<a>` link, but you use these "touchable" components since native doesn't have HTML-style links.

Uses `onPress` prop instead of `onClick` for handling tap events. If you want to check for a longer tap, use the `onLongPress` prop.

### `<TouchableHighlight>`

Basically like wrapping a `<div>` in a `<a>` link, but instead you do `<TouchableHighlight>` wrapping a `<View>`. Makes the `<View>` turn lighter when the user presses (and if they hold), letting them know an interaction is occurring.

```jsx
<TouchableHighlight onPress={this._onPressButton} underlayColor="white">
  <View style={styles.button}>
    <Text style={styles.buttonText}>TouchableHighlight</Text>
  </View>
</TouchableHighlight>
```

📖[Official docs on TouchableHighlight](https://reactnative.dev/docs/touchablehighlight)

### `<TouchableOpacity>`

Reduces the opacity of the content (making it see-through).

```jsx
<TouchableOpacity onPress={this._onPressButton}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>TouchableOpacity</Text>
  </View>
</TouchableOpacity>
```

📖[Official docs on TouchableOpacity](https://reactnative.dev/docs/touchableopacity)

### `<TouchableWithoutFeedback>`

Doesn't show any feedback (like highlight or opacity).

```jsx
<TouchableWithoutFeedback onPress={this._onPressButton}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
  </View>
</TouchableWithoutFeedback>
```

📖 Official docs on [TouchableWithoutFeedback](https://reactnative.dev/docs/touchablewithoutfeedback)

### `<TouchableNativeFeedback>`

Creates a ripple effect on Android.

```jsx
<TouchableNativeFeedback
  onPress={this._onPressButton}
  background={
    Platform.OS === "android"
      ? TouchableNativeFeedback.SelectableBackground()
      : ""
  }
>
  <View style={styles.button}>
    <Text style={styles.buttonText}>
      TouchableNativeFeedback{" "}
      {Platform.OS !== "android" ? "(Android only)" : ""}
    </Text>
  </View>
</TouchableNativeFeedback>
```

📖[Official docs on TouchableNativeFeedback](https://reactnative.dev/docs/touchablenativefeedback)

## `<ScrollView>`

Allows you to create scrollable containers (vertical and horizontal) with any child components (text, image, etc). Basically a `div` set to `overflow: scroll`. Recommended for smaller sets of content, since all components in ScrollView are rendered. FlatList should be used for longer lists (see below).

```jsx
import React, { Component } from "react";
import { ScrollView, Image, Text } from "react-native";

export default class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Text style={{ fontSize: 96 }}>If you like</Text>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Text style={{ fontSize: 96 }}>Scrolling down</Text>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Text style={{ fontSize: 96 }}>What's the best</Text>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Text style={{ fontSize: 96 }}>Framework around?</Text>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 64,
            height: 64,
          }}
        />
        <Text style={{ fontSize: 80 }}>React Native</Text>
      </ScrollView>
    );
  }
}
```

```jsx
import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  return (
    <ScrollView>
      <View style={{ flex: 1, height: 1000 }}>
        <View style={{ flex: 1, backgroundColor: "red" }} />
        <View style={{ flex: 2, backgroundColor: "yellow" }} />
        <View style={{ flex: 3, backgroundColor: "green" }} />
      </View>
    </ScrollView>
  );
}
```

You can allow for paging between ScrollViews (swiping horizontally to go "forward" or "back") by using the `pagingEnabled` prop. Swiping horizontally between views can also be implemented on Android using the [ViewPager](https://github.com/react-native-community/react-native-viewpager) component.

On iOS a ScrollView with a single item can be used to allow the user to zoom content. Set up the `maximumZoomScale` and `minimumZoomScale` props and your user will be able to use pinch and expand gestures to zoom in and out.

[📘Official docs on "Scrollables"](https://reactnavigation.org/docs/4.x/scrollables/)

[📘Official docs on `<ScrollView>`](https://reactnative.dev/docs/scrollview)

## `<FlatList>`

Basically a list component that handles virtualization of the list content, meaning only the items currently on the screen are rendered, making it more efficient.

It also allows for scrolling of content, meaning you shouldn't place it inside a `<ScrollView>`. The list will take up all the space it needs, and add a scroller. If there's content above or below it, you'll still see a scroll, even though you didn't wrap it all in a `<ScrollView>`.

```jsx
import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default class FlatListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            { key: "Devin" },
            { key: "Dan" },
            { key: "Dominic" },
            { key: "Jackson" },
            { key: "James" },
            { key: "Joel" },
            { key: "John" },
            { key: "Jillian" },
            { key: "Jimmy" },
            { key: "Julie" },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
```

**Expo example:**

[FlatList Basics](https://snack.expo.io/HJ1A0BZLL?session_id=snack-session-1r77wYrAC&preview=true&platform=web&iframeId=k7qdkoo9v5&supportedPlatforms=ios,android,web&name=FlatList%20Basics&description=Example%20usage&waitForData=true)

## `<SectionList>`

Same as FlatList, but organizes the list into sections/categories.

```jsx
import React, { Component } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

export default class SectionListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 30 }}>Header</Text>
        <Text style={{ marginBottom: 30 }}>Header</Text>
        <Text style={{ marginBottom: 30 }}>Header</Text>
        <Text style={{ marginBottom: 30 }}>Header</Text>
        <SectionList
          height={30}
          sections={[
            { title: "D", data: ["Devin", "Dan", "Dominic"] },
            {
              title: "J",
              data: [
                "Jackson",
                "James",
                "Jillian",
                "Jimmy",
                "Joel",
                "John",
                "Julie",
              ],
            },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
```

## `<Modal>`

Allows you to quickly create "modal" like views that pop over the current screen. Modal occupies entire screen, not like a web version that is smaller and shows the page content behind it (maybe darkened).

```jsx
import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native";

export default class ModalExample extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
```

📖[Official docs on Modal](https://reactnative.dev/docs/modal)

## `<Picker>`

Basically a `select`, letting you make a dropdown on Android and iOS.

```jsx
import * as React from "react";
import { Picker, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "JavaScript",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ language: itemValue })
          }
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
```

## `<StatusBar>`

Allows you to control the app status bar (top bar on iOS with date, wifi, battery, etc). Doesn't work using Expo on iOS, just hides the bar (which is good for that if needed).

```jsx
<StatusBar
  backgroundColor="blue"
  barStyle="light-content"
  hidden={isRouteHidden}
/>
```

📖[Official docs on StatusBar](https://reactnative.dev/docs/statusbar)

## `<Switch>`

A native toggle switch, like a fancy `checkbox` component.

```jsx
import * as React from "react";
import { StyleSheet, Switch } from "react-native";
import Constants from "expo-constants";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Switch
          value={this.state.confirmed}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ confirmed: itemValue })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
```

📖[Official docs on Switch](https://reactnative.dev/docs/switch)

# Styling

Styling is accomplished through the `style` prop on React Native components. It accepts an object with properties, where the properties are camel-cased CSS properties (e.g. `backgroundColor`). You can also pass an array of styles, and the last style will have precedence, allowing you to override style properties (seen in the example below with the last 2 `<Text>` components).

You can also isolate and create modular, reusable styles using the `StyleSheet.create()` function.

```jsx
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});

export default class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigBlue}>just bigBlue</Text>
        <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
        <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
      </View>
    );
  }
}
```

## Number vs string

If you notice in the example above, the `fontSize` property is a number, rather than a string value like `24px`. React Native has strict typing for it's styling, meaning you have to use the right type when defining style values. [All dimensions in React Native are unitless, and represent density-independent pixels.](https://reactnative.dev/docs/height-and-width)

### Number

- `fontSize`
- `margin` (as well as `marginTop`, etc)
- `padding` (as well as `paddingTop`, etc)

📖[Official docs on styling](https://reactnative.dev/docs/style)

## Typescript

### Types for style prop

React Native ships types for it's various style interfaces for components (like the `style` prop for `<View>` components).

Here is how you'd create a component that allows users to pass additional `Stylesheet` styles to override component styles:

```jsx
import React, { ReactElement } from "react";
import { StyleProp, ViewStyle } from "react-native";

interface Props {
  fill?: string;
  style?: StyleProp<ViewStyle>;
}

function SvgCurve({ fill, ...props }: Props): ReactElement {
  return (
    <svg width={375} height={162} viewBox="0 0 375 162" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M375 0H0v81h295c44.183 0 80-35.817 80-80V0zM0 81.031h79.783C35.7 81.148 0 116.92 0 161.031v-80z"
        fill={fill}
      />
    </svg>
  );
}

SvgCurve.defaultProps = {
  fill: "#000",
};

export default SvgCurve;
```

Here is an example for other component types (like `<Image>`):

```jsx
import * as React from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";

interface IProps {
  label: string;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

interface Styles {
  button: ViewStyle;
  icon: ImageStyle;
  label: TextStyle;
}

const styles =
  StyleSheet.create <
  Styles >
  {
    button: {
      flexDirection: "row",
      backgroundColor: "#336699",
    },

    icon: {
      width: 16,
      height: 16,
    },

    label: {
      color: "#F8F8F8",
      textAlign: "center",
    },
  };

const Button: React.SFC<IProps> = (props): JSX.Element => (
  <TouchableHighlight>
    <View style={[styles.button, props.buttonStyle]}>
      <Image
        style={styles.icon}
        source={require("./assets/someCoolIcon.png")}
      />
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    </View>
  </TouchableHighlight>
);

export default Button;
```

[Stylesheets in React Native with TypeScript Revisited](https://medium.com/@zvona/stylesheets-in-react-native-with-typescript-revisited-6b4ba0a899d2)

# Layout

Most of the layout on React Native is accomplished with the flexbox algorithm. By default, layout is similar to `display: block;` on the web, where each `<View>` component takes up 100% of the width (even if you set a smaller width). By using the `flex` property on `<View>` components, you can line elements up horizontally, or stack them vertically.

Flexbox works the same way in React Native as it does in CSS on the web, with a few exceptions. The defaults are different, with flexDirection defaulting to column instead of row, and the flex parameter only supporting a single number.

### Vertical boxes

```jsx
import React, { Component } from "react";
import { View } from "react-native";

export default class FlexDirectionBasics extends Component {
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, backgroundColor: "red" }} />
        <View style={{ flex: 2, backgroundColor: "yellow" }} />
        <View style={{ flex: 3, backgroundColor: "green" }} />
      </View>
    );
  }
}
```

In the following example the red, yellow and the green views are all children in the container view that has `flex: 1` set. The red view uses `flex: 1` , the yellow view uses `flex: 2` and the green view uses `flex: 3` . `1+2+3 = 6` which means that the red view will get `1/6` of the space, the yellow `2/6` of the space and the green `3/6` of the space.

### Horizontal boxes

```jsx
import React, { Component } from "react";
import { View } from "react-native";

export default class FlexDirectionBasics extends Component {
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{ width: 50, height: 50, backgroundColor: "powderblue" }}
        />
        <View style={{ width: 50, height: 50, backgroundColor: "skyblue" }} />
        <View style={{ width: 50, height: 50, backgroundColor: "steelblue" }} />
      </View>
    );
  }
}
```

📖[Official docs on flexbox](https://reactnative.dev/docs/flexbox)

📖[Official docs on Yoga](https://yogalayout.com/) - the layout engine behind React Native

# Input

Works the same as React. You defer control of the form to React state and make sure the input reflects the React state.

### Class version

```jsx
import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
        <Text style={{ padding: 10, fontSize: 42 }}>
          {this.state.text
            .split(" ")
            .map((word) => word && "🍕")
            .join(" ")}
        </Text>
      </View>
    );
  }
}
```

### Hooks version

```jsx
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [formText, setFormText] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter text here..."
        onChangeText={(text) => setFormText(text)}
        value={formText}
      />
      <Text style={styles.formText}>Form text: {formText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formText: {
    fontSize: 18,
    marginTop: 20,
  },
});
```

# Handling touches

Wrap `<View>` components in "touchable" components, like `<TouchableHighlight>`. See components for more info on which to use when.

📖[Official docs on touches](https://reactnative.dev/docs/handling-touches)

# Data fetching

React Native allows you to use `fetch()` like modern browsers. Just use it in your code, no need to import it from anywhere.

```jsx
import React from "react";
import { FlatList, ActivityIndicator, Text, View } from "react-native";

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch("https://reactnative.dev/movies.json")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.movies,
          },
          function () {}
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}
```

By default, iOS will block any request that's not encrypted using [SSL](https://hosting.review/web-hosting-glossary/#12). If you need to fetch from a cleartext URL (one that begins with `http`) you will first need to [add an App Transport Security exception](https://reactnative.dev/docs/integration-with-existing-apps#test-your-integration). If you know ahead of time what domains you will need access to, it is more secure to add exceptions only for those domains; if the domains are not known until runtime you can [disable ATS completely](https://reactnative.dev/docs/integration-with-existing-apps#app-transport-security). Note however that from January 2017, [Apple's App Store review will require reasonable justification for disabling ATS](https://forums.developer.apple.com/thread/48979). See [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW33) for more information.

### Using Other Networking Libraries

The [XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) is built into React Native. This means that you can use third party libraries such as [frisbee](https://github.com/niftylettuce/frisbee) or [axios](https://github.com/mzabriskie/axios) that depend on it, or you can use the XMLHttpRequest API directly if you prefer.

```jsx
var request = new XMLHttpRequest();
request.onreadystatechange = (e) => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log("success", request.responseText);
  } else {
    console.warn("error");
  }
};

request.open("GET", "https://mywebsite.com/endpoint/");
request.send();
```

The security model for XMLHttpRequest is different than on web as there is no concept of [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) in native apps.

## WebSocket Support

React Native also supports [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket), a protocol which provides full-duplex communication channels over a single TCP connection.

```
var ws = new WebSocket('ws://host.com/path');

ws.onopen = () => {
  // connection opened
  ws.send('something'); // send a message
};

ws.onmessage = (e) => {
  // a message was received
  console.log(e.data);
};

ws.onerror = (e) => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = (e) => {
  // connection closed
  console.log(e.code, e.reason);
};
```

## Known Issues with `fetch` and cookie based authentication

The following options are currently not working with `fetch`

- `redirect:manual`
- `credentials:omit`
- Having same name headers on Android will result in only the latest one being present. A temporary solution can be found here: [https://github.com/facebook/react-native/issues/18837#issuecomment-398779994](https://github.com/facebook/react-native/issues/18837#issuecomment-398779994).
- Cookie based authentication is currently unstable. You can view some of the issues raised here: [https://github.com/facebook/react-native/issues/23185](https://github.com/facebook/react-native/issues/23185)
- As a minimum on iOS, when redirected through a `302`, if a `Set-Cookie` header is present, the cookie is not set properly. Since the redirect cannot be handled manually this might cause a scenario where infinite requests occur if the redirect is the result of an expired session.

# References

- [https://medium.com/@zvona/stylesheets-in-react-native-with-typescript-revisited-6b4ba0a899d2](https://medium.com/@zvona/stylesheets-in-react-native-with-typescript-revisited-6b4ba0a899d2)
