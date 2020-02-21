---
id: regex
title: Regex
sidebar_label: Regex
---

# Find between brackets (e.g. [thistext])

`\[(.*?)\]`

Find something between 2 strings (e.g. "find [this phrase]") -- via: https://stackoverflow.com/questions/1454913/regular-expression-to-find-a-string-included-between-two-characters-while-exclud

`(?<=\[)(.*?)(?=\])`

Example: `find [this phrase]` returns `this phrase`

# Find all image tags (e.g. `<img src="#">`)

`\<img (.*?)\>`

## Replace with enclosed image tags (using VSCode find and replace):

`<img $1 />`

# Find all src

`src="(.*?)\"`
