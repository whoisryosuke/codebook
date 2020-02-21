---
id: config
title: GatsbyJS Configuration
sidebar_label: Config
---

## Webpack

### Relative paths

Alias components directory (and others) instead of relative modules (`../../../components?/button`) - via: https://github.com/jaredpalmer/thinkaboutthis.fm/blob/master/gatsby-node.js

```js
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

exports.onCreateWebpackConfig = ({ config, actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        formatter: "codeframe",
        tslint: "./tslint.json",
        watch: "./src"
      })
    ],
    resolve: {
      alias: {
        "@components": path.join(__dirname, "./src/components"),
        "@lib": path.join(__dirname, "./src/lib"),
        "@api": path.join(__dirname, "./src/api"),
        "@utils": path.join(__dirname, "./src/utils"),
        "@screens": path.join(__dirname, "./src/screens"),
        "@forms": path.join(__dirname, "./src/forms"),
        "@theme": path.join(__dirname, "./src/theme")
      }
    }
  });
};
```
