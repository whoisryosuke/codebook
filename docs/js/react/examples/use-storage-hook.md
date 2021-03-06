---
id: use-storage-hook
title: useStorage hook + component
sidebar_label: "Hooks: useStorage"
---

Example of a hook that syncs state from context to local storage, and hydrates context with the cached local storage results. This comes from my `next-mdx-deck` project, so it has NextJS APIs to trigger page changes.

_Bonus:_ You can import the `<Storage />` component into the app to use the hook more declaratively.

```js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCurrentSlide } from "../context/CurrentSlideContext";

const keys = {
  slide: "next-mdx-deck-slide",
  page: "next-mdx-deck-page",
};

export const useStorage = () => {
  const { currentSlide, setSlide } = useCurrentSlide();
  const router = useRouter();
  const currentPage =
    router.query && "slide" in router.query && parseInt(router.query.slide, 10);
  const [focused, setFocused] = useState(false);

  /**
   * Checks when user enters (focus) or
   * leaves (blur) browser window/tab
   */
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  /**
   * Updates route or context with local storage data
   * from event listener
   * @param {*} e
   */
  const handleStorageChange = (e) => {
    const n = parseInt(e.newValue, 10);
    const syncedSlide = localStorage.getItem(keys.slide);
    // if (focused) return
    if (Number.isNaN(n)) return;
    switch (e.key) {
      case keys.page:
        router.push(`/slides/${parseInt(n, 10)}#${syncedSlide}`);
        break;
      case keys.slide:
        window.location.hash = `#${n}`;
        setSlide(n);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setFocused(document.hasFocus());
  }, []);

  useEffect(() => {
    if (!focused) window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    return () => {
      if (!focused) window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [focused]);

  /**
   * Sync localstorage with changes to slides or pages
   */
  useEffect(() => {
    if (!focused) return;
    localStorage.setItem(keys.slide, currentSlide);
    localStorage.setItem(keys.page, currentPage);
  }, [focused, currentSlide, currentPage]);
};

// Import this component into the app to sync state
// e.g <Storage />
export const Storage = () => {
  useStorage();
  return false;
};

export default useStorage;
```
