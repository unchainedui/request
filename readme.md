# Unchained UI

## Request

[![NPM Version](https://img.shields.io/npm/v/uc-request.svg?style=flat-square)](https://www.npmjs.com/package/uc-request)
[![NPM Downloads](https://img.shields.io/npm/dt/uc-request.svg?style=flat-square)](https://www.npmjs.com/package/uc-request)

Low-level HTTP request with file upload and progress

### Usage

```js
import request from 'uc-log'

request.send({
  url: 'http://localhost/api/user.get',
  method: 'get'
}, res => {
  console.log(res);
})
```

### Static methods

#### send(options, callback)

Creates the instance of the Request class and sends the requests. Returns the class instance.

### Methods

#### send(options, callback)

Sends the request and calls `callback`.

`options` are:

* **url** – string, URL
* **method** – string, http method
* **headers** – object, http headers
* **body** – various, http request body
* **options** – object, any other properties to set on XMLHttpRequest
* **onprogress** – function, upload progress handler

**callback(result)**

* **result**
  - **status** — https request status
  - **body** — response body. If JSON will be parsed.
  - error — error if request failed

#### abort()

Aborts the request.

License MIT

© velocityzen
