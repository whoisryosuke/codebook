---
id: netlify
title: Netlify
sidebar_label: Netlify
---

# Netlify Functions

## Fetch example with Wordpress OAuth

```js
// Netlify Function (/functions/create-event.js)
import fetch from "node-fetch";
export async function handler(event, context, callback) {
  // Currently this only works with variables that are defined in the UI and not in the netlify.toml
  // Using ES6 destructuring to pull the variable called FAKE_TOKEN out of the process.env object
  // You can then use the FAKE_TOKEN anywhere in your code just as you would any string variable
  const { WORDPRESS_SECRET } = process.env;
  const formData = JSON.parse(event.body);

  try {
    const response = await fetch(
      "http://mywordpresssite.com/wp-json/wp/v2/event",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${btoa(WORDPRESS_SECRET)}`
        },
        body: {
          title: formData.title,
          status: "draft",
          content: formData.content
        }
      }
    );
    console.log("response", await response.body);
    console.log("form", formData);
    // I've tried callback vs just returning, neither seem to work
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ msg: `Success` })
    });
  } catch (err) {
    console.log(err); // output to netlify function log
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    });
  }
}

// Create Page component (/pages/create-event.js)
const submitForm = async e => {
  e.preventDefault();

  const formData = JSON.stringify({
    title: title,
    status: "draft",
    content: content
  });

  try {
    const response = await fetch("/.netlify/functions/create-event", {
      method: "POST",
      mode: "cors", // no-cors, cors, *same-origin
      body: formData
    });
    console.log("response", response);
  } catch (err) {
    console.log(err); // output to netlify function log
  }
};
```
