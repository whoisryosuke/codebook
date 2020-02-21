---
id: best-practices
title: jQuery Best Practices
sidebar_label: Best Practices
---

# Creating New App

## Run jQuery on Load

Best practice for jQuery functions to wrap in IIFE (immediately invoked function expression). Example shows a shorthand of `$(document).ready as $(function() {})`. Based on: http://gregfranko.com/blog/jquery-best-practices/

```js
(function($) {
  $(function() {
    $(".example").dropdown();
  });
})(jQuery);
```

```js
// IIFE keeps all code out of global scope
(function($, window, document) {
  // The $ is now locally scoped
  $(function() {
    // The DOM is ready!
    // equiv of $(document).ready(function () {
  });
})(window.jQuery, window, document);
```
