---
id: hooks
title: React Hooks
sidebar_label: Hooks
---

# Examples

## usePromise

via: https://gist.github.com/mjackson/05c7749430d0ec87b66612733805bad6

```js
import { useState, useEffect, useCallback } from "react";

function usePromise(createPromise) {
  const [error, setError] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    let current = true;

    createPromise().then(
      value => {
        if (current) setValue(value);
      },
      error => {
        if (current) setError(error);
      }
    );

    return () => {
      current = false;
    };
  }, [createPromise]);

  return [error, value];
}

// Use it like this:

function Profile({ uid }) {
  const [error, user] = usePromise(useCallback(() => fetchUser(uid), [uid]));
  // ...
}
```
