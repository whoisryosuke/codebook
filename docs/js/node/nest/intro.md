---
id: intro
title: Nest Introduction
sidebar_label: Introduction
---

# What is NestJS?

Full stack MVC development framework for NodeJS. Give you the framework to spin up a NodeJS backend API, microservice, or full-stack website with common integrations for GraphQL and Web Sockets. Uses model, view, and controller architecture for structuring apps.

Like Laravel, if someone was a fan of Angular and JS decorators, with more open wrappers around underlying libraries (like Express/Fastify for routing). 

Big on "dependency injection", meaning the app won't import your library unless you explicitly inject it into the app:

```jsx
// Not used by app
import CustomService from "module-name"
// Used by app because it's injected
import ProductController from "./controllers/product"

@Module({
	controllers: [ProductController]
})
```

# Why use NestJS?

**Pros:**

- Simplifies development with things like decorators.
- Frontend agnostic (can use as backend with React/Vue/etc)

**Supports:**

- Express/Fastify (uses Express by default)
- GraphQL (wrapper around Apollo)
- Web Sockets
    - Supports [socket.io](http://socket.io) and ws

**Built in:**

- First class Typescript support
- Unit testing using Jest
- E2E testing

# How do I use NestJS?

1. Make sure NodeJS is installed.
2. Setup a new project with CLI (or clone template). See [getting started docs here.](https://docs.nestjs.com/first-steps)

# Limitations of NestJS?

- 

## Compatibility

# References

## Official Documentation

- [https://docs.nestjs.com/](https://docs.nestjs.com/)

## Tutorials

- 

## 3rd Party Integrations

- 

## Videos / Media

[Learn Nest.js from Scratch by building an API](http://youtube.com/watch?v=F_oOtaxb0L8)

[Nest.js with MongoDB - Complete Example](https://www.youtube.com/watch?v=ulfU5vY6I78)

[NestJS Crash Course](https://www.youtube.com/watch?v=wqhNoDE6pb4&t=616s)

[Demystifying Dependency Injection: Angular vs NestJS - Kamil Mysliwiec | NG-DE 2019](https://www.youtube.com/watch?v=vYFhHVMetPg&list=WL&index=10&t=298s)

[Kamil Myśliwiec - Revealing framework fundamentals: NestJS behind the curtain](https://www.youtube.com/watch?v=jo-1EUxMmxc)