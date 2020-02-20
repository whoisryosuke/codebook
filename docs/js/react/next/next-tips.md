---
id: next-tips
title: Tips - NextJS
sidebar_label: Tips
---

## Data Fetching

### Dynamic Domain Fetch

Dynamic domain/host URL for fetching - instead of using ENV/config values for a root domain. [via](https://auth0.com/blog/next-js-authentication-tutorial/)

```js
Index.getInitialProps = async ({ req }) => {
  const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
  const res = await fetch(`${baseURL}/api/thoughts`);
  return {
    thoughts: await res.json()
  };
};
```
