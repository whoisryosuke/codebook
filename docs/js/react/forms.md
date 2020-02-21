---
id: forms
title: React Forms
sidebar_label: Forms
---

# Gotchas

Sometimes there are common gotchas that can create puzzling problems which inevitably have common solutions.

## onClick Parent Element (Not Child)

How to target "parent" instead of child during onClick. Problem: `e.target` refs actual child clicked, instead of onClick wrapper. Using the `currentTarget` property, we can access the parent/wrapper with the `onClick` instead.

```js
const submitForm = e => {
  // ❌ Targets child
  console.log(e.target.value);

  // ✅ Targets wrapper with onClick prop
  console.log(e.currentTarget.value);

  // ✅ If above fails, log currentTarget and see if it looks like HTML
  // currentTarget usually returns as type of HTMLElement
  // If so, use this to grabs attributes (like href or name)
  // see: https://stackoverflow.com/q/29223502/10097916
  console.log(e.currentTarget.getAttribute("href"));
};
```

From the DOM Event documentation:

> Event.currentTarget Identifies the current target for the event, as the event traverses the DOM. It always refers to the element to which the event handler has been attached, as opposed to event.target which identifies the element on which the event occurred.
