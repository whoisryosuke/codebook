---
id: linting
title: Linting
---

## Linting Basics

- ESLint
- Prettier
- Airbnb Config for ESLint
- Prettier Config for ESLint

## Using Gitmoji

> Assumes you have a linting and testing environment setup. This may differ per project, so they've been skipped in this process.

### Install dependencies

`npm i -D husky @commitlint/cli @commitlint/config-conventional commitlint-config-gitmoji`
`yarn add -D husky @commitlint/cli @commitlint/config-conventional commitlint-config-gitmoji`

### Add Husky config to package.json

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm test",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

### Create config for commitlint and gitmoji support

```bash
echo "module.exports = {extends: ['./node_modules/commitlint-config-gitmoji']};" > commitlint.config.js
```

### Commit using emoji!

```bash
git commit -m ":heavy_plus_sign: Husky + commitlint"
```

### References

- https://github.com/arvinxx/commitlint-config-gitmoji
- https://github.com/conventional-changelog/commitlint
- https://commitlint.js.org/#/reference-rules
