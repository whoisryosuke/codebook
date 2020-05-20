---
id: intro
title: Firebase Introduction
sidebar_label: Introduction
---

# What is Firebase?

Google's cloud based authentication, database, and storage solution. Provides a NoSQL DB and storage (like a S3/CDN) for your web or native apps. It provides a built-in authentication layer using OAuth2.0, similar to Auth0, alongside the other services.

# Why use Firebase?

- Provides easy to use integrations for web and native apps
- Provides managed and scalable DB solution
- Ubiquitous solution, meaning many will be familiar with API and SDK
- Provides authentication solution out of the box

# How do I use Firebase?

1. Sign up for Google and Firebase.
2. Create a new app.
3. [Create a new DB.](https://firebase.google.com/docs/database/web/start)
4. Structure the NoSQL DB through the web console
5. [Install the SDK into your app](https://firebase.google.com/docs/web/setup#using-module-bundlers) (or add the JS bundle from their CDN)
6. Add the credentials to your app (using ENV vars)
7. Use the `firebase()` function for [DB read/write](https://firebase.google.com/docs/database/web/read-and-write), [auths](https://firebase.google.com/docs/auth/web/start), etc

# Limitations of Firebase?

## Compatibility

- Client-side and server-side (NodeJS) SDKs are different.

# References

- [https://firebase.google.com/pricing](https://firebase.google.com/pricing)

## Official Documentation

- [Getting Started with a module bundler docs](https://firebase.google.com/docs/web/setup#using-module-bundlers)
- [Authentication intro docs](https://firebase.google.com/docs/auth)
- [How to authenticate users docs](https://firebase.google.com/docs/auth/web/start)
- [Creating new DB and setting up the config for DB](https://firebase.google.com/docs/database/web/start)
- [Structuring data for NoSQL apps](https://firebase.google.com/docs/database/web/structure-data)
- [Read and write to DB](https://firebase.google.com/docs/database/web/read-and-write)

## Tutorials

- 

## 3rd Party Integrations

- [https://www.gatsbyjs.org/packages/gatsby-plugin-firebase/](https://www.gatsbyjs.org/packages/gatsby-plugin-firebase/)

## Videos / Media

[A Firestore Data Modeling Session with Jeff Delaney](https://www.youtube.com/watch?v=i-SP9WeZ5SE)