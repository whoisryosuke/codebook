---
id: currency
title: Currency in JavaScript
sidebar_label: Currency
---

# Parsing money integers

Round integer to 2 digits (for money/currency) - via: https://stackoverflow.com/a/12830454 -- https://stackoverflow.com/a/11665949

If the value is a text type:

```js
parseFloat("123.456").toFixed(2);
```

If the value is a number:

```js
var numb = 123.23454;
numb = numb.toFixed(2);
```

If the number has a comma:

```js
parseFloat(yournumber.replace(/,/g, ""));
// $1,933.00 becomes 1933
```
