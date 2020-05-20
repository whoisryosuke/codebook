---
id: router
title: Router - NextJS
sidebar_label: Router
---

## Router Tips

### Dynamic Routes + Query Params / Hash

If you want to add query parameters or hash to a dynamic URL in Next, you have to append it to the `as` prop:

```js
import { useRouter } from "next/router";
const router = useRouter();
// router.push('/slides/[slide]', '/slides/1?mode=slideshow#1')
router.push(
  router.pathname,
  `/slides/${router.query.slide}?mode=${MODES.SLIDESHOW}#${prevState + 1}`,
  { shallow: true }
);
```

> We pass the `shallow` parameter so the URL doesn't get pushed to history and won't trigger a refresh of the page (and methods like `getInitialProps`).

Instead of this, which doesn't work:

```js
// ⛔️ Don't do
router.push(
  `${router.pathname}?mode=${MODES.SLIDESHOW}#${prevState + 1}`,
  `/slides/${router.query.slide}`,
  { shallow: true }
);
```
