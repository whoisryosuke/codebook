---
id: hooks-as-components
title: Using Hooks as Components
sidebar_label: Hooks as Components
---

For hooks that provide effects to the app (like syncing context to storage in this case), we can create a component that uses/runs the hook, and returns `false` (which renders it - but doesn't return any elements).

> Good workaround instead of using a 3rd party library like react-dont-render

```js
import { useStorage } from "hooks/useStorage";

export const Storage = () => {
  useStorage();
  return false;
};

export default useStorage;
```
