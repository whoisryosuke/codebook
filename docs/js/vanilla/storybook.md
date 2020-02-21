---
id: storybook
title: Storybook for JavaScript
sidebar_label: Storybook
---

# Using jQuery in Storybook

Great for Semantic UI and other libraries that require jQuery in the window/globally. via: https://github.com/storybookjs/storybook/issues/327

`config.js`

```js
import jquery from "jquery";
import jQueryAutocomplete from "jquery-ui/ui/widgets/autocomplete";
import jQueryDatepicker from "jquery-ui/ui/widgets/datepicker";

jquery.autocomplete = jQueryAutocomplete;
jquery.datepicker = jQueryDatepicker;
global.$ = jquery;
global.jQuery = jquery;
```
