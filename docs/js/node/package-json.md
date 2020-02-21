---
id: package-json
title: package.json from NodeJS
sidebar_label: package.json
---

## Examples

### Nodemon

Nodemon - General config options (used in `nodemon.json` or `package.json`)

```js
{
    "nodemonConfig": {
      // Ignores these files (default for Gatsby projects)
      "ignore": [
        ".cache/*",
        "public/*",
        "schema.json",
        "src/*",
        "content/*",
        "static/*"
      ],
      // Only checks these folders for changes
      "watch": [
        "src/docs/*",
        "src/blog/*"
      ],
      // Only checks files with these extensions
      "ext": "md, css",
      "delay": "1500"
    },
  }
```
