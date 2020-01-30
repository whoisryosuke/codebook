---
id: node-async
title: Node Async
sidebar_label: Async
---

## Delay Async Functions

Timeout API calls using async await syntax and `setTimeout()`

```js
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function init() {
  for (i = 0; i < 10; i++) {
    await fetchApi();
    await timeout(5000);
  }
}
```

## Delay List (like API requests)

Delay API calls using Promise and setTimeout

```js
/**
 * Runs all listing data fetching async
 * @param {string} url
 * @param {Promise.resolve} resolve
 * @returns {Promise.resolve}
 */
async function getListingData(url, resolve) {
  const listing = {};

  listing.details = await fetchListingPage(url);
  listing.reviews = await fetchListingReviews(url);
  listing.menu = await recursiveProductMenu(url);

  return resolve(listing);
}

/**
 * Loops through urls and creates promise + timeout
 * to delay API calls
 *
 * @param {array} listingUrls
 */
async function loopListings(listingUrls) {
  return await Promise.all(
    listingUrls.map(
      (url, index) =>
        new Promise((resolve, reject) =>
          setTimeout(getListingData, 5000 * index, url, resolve)
        )
    )
  );
}
```
