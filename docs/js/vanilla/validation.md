---
id: validation
title: Validation
sidebar_label: Validation
---

## Check for number

Checks if string contains a number, returns boolean. [via](https://stackoverflow.com/a/28813213)

```js
function hasNumber(myString) {
  return /\d/.test(myString);
}
```

## Check for string

Check variable for any text / characters (a-z) that aren't numbers. (e.g. checks if `const a = '1px'` contains px). [via](https://stackoverflow.com/a/14783209)

```js
const str = "1px";

if (/[a-z]/i.test(str)) {
  // alphabet letters found
}
```
