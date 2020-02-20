---
id: react-integration
title: Integrating Web Components into ReactJS
sidebar_label: Integrating with ReactJS
---

## Ionic Method

Utility function for easily passing event listeners and arrays/objects to web components from React (since it parses arrays/objects passed to props into strings). Based on: https://github.com/ionic-team/ionic-react-conference-app/commit/f9c321efca0fb498ea6e3c58c49caf2587c7832f#diff-0e2274f69e75ae52e9d25e8939fb2205.

Instead of writing:

```js
<ion-segment
  value={props.filterFavorites}
  arrayProp={some.arrayValue} // Gets converts to string by React
  objectProp={another.objectValue} // Gets converts to string by React
  ionChange={e => props.updateFavoriteFilter(e.target.value)}
></ion-segment>
```

You use the utility function inside the ref prop:

```js
<ion-segment
  value={props.filterFavorites}
  ref={wc(
    {
      arrayProp: some.arrayValue,
      objectProp: another.objectValue
    },
    {
      ionChange: e => props.updateFavoriteFilter(e.target.value)
    },
    {
      arrayValue: your.arrayValue
    }
  )}
></ion-segment>
```

### Utility Function

```js
/***
 * This function is meant to make it easier to use Props and Custom Events with Custom Elements in React.
 * @param {object} props - Props to pass to web component
 * @param {object} customEvents - Custom events to pass to web component
 ***/

export function wc(props = {}, customEvents = {}) {
  let storedEl;

  return function(el) {
    Object.entries(customEvents).forEach(([name, value]) => {
      // If we have an element then add event listeners
      // otherwise remove the event listener
      const action = el ? el.addEventListener : storedEl.removeEventListener;
      if (typeof value === "function") {
        action(name, value);
        return;
      }
    });
    // If we have an element then set props
    if (el) {
      Object.entries(props).forEach(([name, value]) => {
        el[name] = value;
      });
    }
    storedEl = el;
  };
}
```
