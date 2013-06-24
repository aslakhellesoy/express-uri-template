# express-uri-template

express-uri-template is the reverse of [express' application routing](http://expressjs.com/api.html#app.VERB).

express:

```
/forum/:fid/thread/:tid + /forum/hello/thread/world = {"fid": "hello", "tid": "world"}
```

express-uri-template:

```
/forum/:fid/thread/:tid + {"fid": "hello", "tid": "world"} = /forum/hello/thread/world
```

## Why?

So you can generate urls from templates.

## When?

You can use it in the browser, e.g. to generate URLs for AJAX requests or links inserted into the DOM.
You can also use it in Node.js, to generate URLs for HTTP redirects or links in generated HTML.

## Install

Node.js:

```
npm install express-uri-template
```

Bower:

```
bower install express-uri-template
```

## Use

Use *object* params:

```javascript
var eut = require('express-uri-template');

var uri = eut('/forum/:fid/thread/:tid', {"fid": "hello", "tid": "world"});
console.log(uri); // -> /forum/hello/thread/world
```

Use *Array* params (aka `req.params`):

```javascript
var eut = require('express-uri-template');

var uri = eut('/forum/*/thread/*', ["hello", "world"]);
console.log(uri); // -> /forum/hello/thread/world
```

## Why the strange name?

This library is inspired by [RFC 6570](http://tools.ietf.org/html/rfc6570), except that it uses express'
uri template syntax, and is much simpler.

