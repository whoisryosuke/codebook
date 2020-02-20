---
id: error-handling
title: Error Handling - Express
sidebar_label: Error Handling
---

## Examples

### Basic 404 and 500

Handles 404 and 500 errors using Express middleware. Shows error in development, but not production. [via](https://mherman.org/blog/local-authentication-with-passport-and-express-4/)

```js
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});
```
