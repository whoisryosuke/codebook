---
id: sync-state
title: Example - Sync State Between Tabs
sidebar_label: Sync State Between Tabs
---

Use case: You have component state you want to sync between browser tabs. For example, if a user opens the app in two browser tabs and runs a timer in one tab, the other tab should update it's state to keep it synced.

This is accomplished basically:

1. Lift component state to React Context
2. Create a React component for managing syncing.
3. Add a `focused` state to the new component to handle when the user is focused on the current browser tab.
4. Use the `useEffect` lifecycle to add 3 eventListeners: `storage`, `blur`, and `focus`.
- - Blur handles when user leaves browser
- - Focus handles when user enters browser tab
- - Storage handles when anything in localStorage changes
5. We handle each event listener:
- - For the storage, we only run it for unfocused tabs, and update the context with the localStorage changes
- - For the blur and focus, we change the component state to reflect the event we detect (blur or focus).


## Examples

### Syncing Slides in Next MDX Deck

```jsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCurrentSlide } from '../context/CurrentSlideContext'

const keys = {
  slide: 'next-mdx-deck-slide',
  page: 'next-mdx-deck-page',
}

export const useStorage = () => {
  // Context hook that grabs data and "setter" function
  const { currentSlide, setSlide } = useCurrentSlide()
  // Only necessary if redirecting or grabbing URL
  const router = useRouter()
  // Gets current page from NextJS URL
  const currentPage =
    router.query && 'slide' in router.query && parseInt(router.query.slide, 10)

  const [focused, setFocused] = useState(false)

  /**
   * Checks when user enters (focus) or
   * leaves (blur) browser window/tab
   */
  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  /**
   * Updates route or context with local storage data
   * from event listener
   * @param {*} e
   */
  const handleStorageChange = (e) => {
    const n = parseInt(e.newValue, 10)
    const syncedSlide = localStorage.getItem(keys.slide)
    // if (focused) return
    if (Number.isNaN(n)) return
    switch (e.key) {
      case keys.page:
        router.push(`/slides/${parseInt(n, 10)}#${syncedSlide}`)
        break
      case keys.slide:
        window.location.hash = `#${n}`
        setSlide(n)
        break
      default:
        break
    }
  }

  // Checks if user is focused on component render
  useEffect(() => {
    setFocused(document.hasFocus())
  }, [])

  // Adds and removes event listeners based on focused state
  useEffect(() => {
    if (!focused) window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)
    return () => {
      if (!focused) window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [focused])

  /**
   * Sync localstorage with changes to slides or pages
   */
  useEffect(() => {
    if (!focused) return
    localStorage.setItem(keys.slide, currentSlide)
    localStorage.setItem(keys.page, currentPage)
  }, [focused, currentSlide, currentPage])
}

// We create a component to isolate the hook to it's own component lifecycle
// You can use the above function as a hook (like below) inside any component
export const Storage = () => {
  useStorage()
  return false
}

export default useStorage

```