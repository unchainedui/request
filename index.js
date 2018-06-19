const isXTR2 = ('FormData' in window);

const Request = function() {
  this.isAborted = false;
  this.xhr = null;
  this.cb = null;
};

Request.prototype = {
  send: function(req, cb) {
    const xhr = new XMLHttpRequest();

    this.xhr = xhr;
    this.cb = cb;

    if (isXTR2) {
      xhr.onerror = err => this.handleResult(err);
      xhr.onload = () => this.handleResult();

      if (req.onprogress) {
        xhr.upload.onprogress = req.onprogress;
      }
    } else {
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          xhr.onreadystatechange = null;
          this.handleResult();
        }
      };
    }

    xhr.open(req.method.toUpperCase(), req.url, true);

    for (const k in req.headers) {
      xhr.setRequestHeader(k, req.headers[k]);
    }

    if (req.options) {
      for (const o in req.options) {
        xhr[o] = req.options[o];
      }
    }

    xhr.send(req.body);
  },

  abort: function() {
    this.isAborted = true;
    this.xhr.onreadystatechange = null;
    this.xhr.abort();
  },

  handleResult: function(err) {
    const xhr = this.xhr;

    if (this.isAborted) {
      return;
    }

    if (err || !xhr.status) {
      return this.cb({
        status: 'Network error',
        error: err
      });
    }

    let body;
    const responseText = xhr.responseText;

    try {
      body = responseText ? JSON.parse(responseText) : true;
    } catch (e) {
      body = responseText;
    }

    this.cb({
      status: xhr.status,
      body: body
    });
  }
};

Request.send = function(req, cb) {
  const instance = new Request();
  instance.send(req, cb);
  return instance;
};

export default Request;
