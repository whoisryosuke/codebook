---
id: basics
title: Typescript Basics
sidebar_label: Basics
---

# Functions

Types can be added next to the function's parameters.

```ts
function combineName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}
```

# Interfaces

Interfaces are used for representing objects.

```ts
const user = {
  name: "Ryo"
};

interface IUser {
  name: string;
  loggedIn?: boolean = false;
}

function processUser(user: IUser) {
  // process(user.name);
}
```
