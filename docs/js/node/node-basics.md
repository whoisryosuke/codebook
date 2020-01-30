---
id: node-basics
title: Node Basics
sidebar_label: Basics
---

## Encryption

NodeJS uses the [`crypto` module](https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/) to handle the encyrption and decryption of data using various algorithms.

### Encrypt / Decrypt Module

These are simple functions that will encrypt and decrypt provided text using the `aes-256-cbc` algorithm, and the `key` and `iv` as "salt".

`Encrypt.js`:

```js
// Nodejs encryption with CTR
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
// const key = process.env.APP_KEY;
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  encrypt,
  decrypt
};

var hw = encrypt("Private information");
console.log(hw);
console.log(decrypt(hw));
```

[Reference](https://codeforgeek.com/encrypt-and-decrypt-data-in-node-js/)
