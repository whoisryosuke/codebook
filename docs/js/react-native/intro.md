---
id: intro
title: React Native Introduction
sidebar_label: Introduction
---

# What is React Native?

React Native is a framework for creating cross-platform applications, from Android, to iOS, to web apps. It enables developers to write native applications using React components that replicate native functionality such as: displaying text, creating flexbox grids, or handling form input.

# Why use React Native?

Writing applications for Android and iOS requires platform specific knowledge (like Java/Swift for iOS). This creates multiple codebases, built on different languages, and requires developers with different (or varied) skillsets. Instead, apps can be built using React Native, which streamlines the codebase by relying solely on JavaScript. Not technically, there is plenty of native code under the hood, but as far as most devs are concerned, they don't ever need to write native code. But you can "eject" and write native code when needed.

You could also achieve a similar shared codebase using frameworks like Ionic, which use HTML/CSS/JS to create native apps. This will have similar limitations to React Native, where the framework only has limited native functionality, and expands it over time (for example, RN doesn't support native Apple or Google payments).

# How do I use React Native?

You can use [react-native-cli](https://www.npmjs.com/package/react-native-cli) or [Expo](https://expo.io/) to create the app. The CLI is more hands-on, and requires you to install/use Android and iOS emulation software (like XCode). While Expo is more simple, and handles the process for you, only requiring you to scan a QR code to test the app natively (or emulates the phone on your desktop).

See the basics guide for a quick start tutorial.

# Limitations of React Native?

## Compatibility

- Navigation
- Maps
- Gestures
- Videos
- Native payments (Apple Pay)

All of these are available as a popular 3rd party plugins.

[Build it Once with Expo for Web: Create PWAs with cutting-edge browser functionality - Evan Bacon](https://youtu.be/ykBxY01j_rA?list=PLUGDC1tkjMjdSuARJs7TyVthnfJrf0Jud&t=288)

# Sample Stacks

- Storybook for integration
- Storybook + Snapshots for integration automation

## Testing [@ Zopa](https://youtu.be/K6secfFpl3Q?list=PLUGDC1tkjMjdSuARJs7TyVthnfJrf0Jud&t=992)

- **Jest** for unit tests
- **Detox** for integration
- **Appium** for E2E
- **SonarQube** for code quality
- **Sentry** for crash reporting
- **Jenkins** for CI/CD
- **Mac server** (on-site) for builds
- **App Center and TestFlight** for beta distribution

# References

## Official Documentation

- [https://reactnative.dev/](https://reactnative.dev/)
- [https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started)
- [https://reactnative.dev/docs/button](https://reactnative.dev/docs/button)
- [https://reactnative.dev/docs/accessibility](https://reactnative.dev/docs/accessibility)
- [https://reactnative.dev/docs/performance](https://reactnative.dev/docs/performance)
- [https://reactnative.dev/docs/native-modules-setup](https://reactnative.dev/docs/native-modules-setup)
- [https://reactnative.dev/docs/native-modules-ios](https://reactnative.dev/docs/native-modules-ios)
- [https://reactnative.dev/docs/native-modules-android](https://reactnative.dev/docs/native-modules-android)

## Tutorials

- [https://www.learnstorybook.com/intro-to-storybook/react-native/en/get-started/](https://www.learnstorybook.com/intro-to-storybook/react-native/en/get-started/)

## Tools

- [Snack by Expo](https://snack.expo.io/)
  - Live coding for React Native (like CodePen/CodeSandbox)
- [Flipper by Facebook](https://fbflipper.com/)
  - Dev tools for RN
- [Bob](https://github.com/react-native-community/bob)
  - CLI and build system for bootstrapping new RN native modules/packages (like create-react-package). [Recommended by official RN guide.](https://reactnative.dev/docs/native-modules-setup)

## 3rd Party Integrations

- [https://github.com/react-native-community](https://github.com/react-native-community)
  - Semi-official components that usually get adopted to official RN
- [https://github.com/react-native-community/cookies](https://github.com/react-native-community/cookies)
  - Cookies for React Native
  - [Has issues with Expo](https://github.com/expo/expo/issues/6756)

## Videos / Media

- [Flipper: The Extensible DevTool Platform for React Native - Michel Weststrate aka @mweststrate](https://www.youtube.com/watch?v=WltZTn3ODW4)
- [Building a Banking App with React Native - React Native - May 2019](https://youtu.be/K6secfFpl3Q?list=PLUGDC1tkjMjdSuARJs7TyVthnfJrf0Jud)
  - Great overview of their project management. Instead of feature branching, they use feature flags (like React/other libs). This essentially uses feature branches, but they push code to production more often, just under flags, so it doesn't show up for everyone.
    - Dangerous if you ship untested code, since any bad component - even undisplayed or not, can have an impact on the build process.
    - But great for fast workflows helped with automated processes.
  - Goes over testing setup
- [Leveraging Native Components iOS Vs Android - React Native - August 2019](https://youtu.be/fSioAPn3keE?list=PLUGDC1tkjMjdSuARJs7TyVthnfJrf0Jud)
  - Good overview of creating native components for RN (using Swift/Android)

## Compilations

- [https://www.awesome-react-native.com/](https://www.awesome-react-native.com/)
- [https://github.com/ReactNativeNews/React-Native-Apps](https://github.com/ReactNativeNews/React-Native-Apps)
