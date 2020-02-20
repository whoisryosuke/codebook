---
id: hide-on-scroll
title: Example - Hide Element on Scroll
sidebar_label: Hide on Scroll
---

Hide element/nav/header/footer on scroll. If user scrolls down at any time, hide the element. If they scroll up, show it again.

In this case, it's a footer that's sticky to the bottom of the screen, and hides outside the screen using a CSS transform.

### The hook:

`useScrollPosition.js`:

```js
import { useRef, useLayoutEffect } from "react";

const isBrowser = typeof window !== `undefined`;

function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top };
}

export function useScrollPosition(effect, deps, element, useWindow, wait) {
  const position = useRef(getScrollPosition({ useWindow }));

  let throttleTimeout = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, deps);
}
```

### Use hook in component

`component.jsx`:

```jsx
import React, { useState } from "react";

import { useScrollPosition } from "../hooks/useScrollPosition";

export default function Footer() {
  const [sticky, setSticky] = useState(false);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== sticky) setSticky(isShow);
    },
    [sticky]
  );

  return (
    <Box
      as="footer"
      mb="-1em"
      sx={{
        position: "sticky",
        transform: sticky ? "translateY(100%)" : "translateY(0)",
        transition: "transform 400ms ease-in",
        bottom: 0,
        left: 0
      }}
    >
      © {new Date().getFullYear()}
    </Box>
  );
}
```
