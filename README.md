![wozu](https://raw.githubusercontent.com/felixheck/wozu/master/logo.png)

#### Server decorator and util to list all defined hapi.js routes

[![Travis](https://img.shields.io/travis/felixheck/wozu.svg)](https://travis-ci.org/felixheck/wozu/builds/) ![node](https://img.shields.io/node/v/wozu.svg) ![npm](https://img.shields.io/npm/dt/wozu.svg) [![standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/) ![npm](https://img.shields.io/npm/l/wozu.svg)
---

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Usage as Util](#usage-as-util)
5. [API](#api)
6. [Developing and Testing](#developing-and-testing)
7. [Contribution](#contribution)
8. [License](#license)

## Introduction
**wozu** is a plugin in the form of a server decorator and an additional util to list all defined routes of your [hapi.js](https://github.com/hapijs/hapi) server instance. Just call the server method and get a list of all endpoints including paths and methods.<br>
*wozu* is the German translation for *wherefore* - it was implemented as an util related to the plugin [wo](https://github.com/rjrodger/wo).

The modules `standard` and `ava` are used to grant a high quality implementation.<br>
This major release supports just [hapi.js](https://github.com/hapijs/hapi) `>=v16.0.0` and node `>=v8.0.0` https://github.com/felixheck/wozu/tree/release/2.0.0 — to support older versions please use `v1.1.1`.

## Installation
For installation use the [Node Package Manager](https://github.com/npm/npm):
```
$ npm install --save wozu
```

or clone the repository:
```
$ git clone https://github.com/felixheck/wozu
```

## Usage
#### Import
First you have to import the module:
``` js
const wozu = require('wozu');
```

#### Create hapi server
Afterwards create your hapi server and the corresponding connection if not already done:
``` js
const hapi = require('hapi');

const server = hapi.server({
  port: 8888,
  host: 'localhost',
});
```

Additionally register all your routes.

#### Registration
Finally register the plugin per `server.register()`:
``` js
await server.register(wozu);
```

After registering `wozu`, the [hapi server object](https://hapijs.com/api#server) will be decorated with the new method `server.wozu()`.<br>
It is not allowed to register `wozu` twice.

#### Usage
Use the plugin/util in the required context. For example during the registration of `wo`:

``` js
await server.register({
  register: require('wo'),
  options: {
    bases,
    route: server.wozu(),
    sneeze: {
      silent: true
    }
  }
})
```

The method returns a sorted and unified list of all defined routes.<br>

## Usage as Util
This package include besides the plugin a corresponding util feature, so it is not necessary to use `wozu` as a plugin:

``` js
const wozu = require('wozu');
const hapi = require('hapi');

const server = hapi.server({
  port: 8888,
  host: 'localhost',
});

async function init() {
  await server.register({
    register: require('wo'),
    options: {
      bases,
      route: wozu.list(server),
      sneeze: {
        silent: true
      }
    }
  })
}

init();
```

## API
`wozu.list(server, [host])`

- `server {Object}` - the corresponding [hapi server object](https://hapijs.com/api#server).
- `host {string}` - the host to filter routes matching a specific virtual host.

`server.wozu([host])`

- `host {string}` - the host to filter routes matching a specific virtual host.


## Developing and Testing
First you have to install all dependencies:
```
$ npm install
```

To execute all unit tests once, use:
```
$ npm test
```

or to run tests based on file watcher, use:
```
$ npm start
```

To get information about the test coverage, use:
```
$ npm run coverage
```

## Contribution
Fork this repository and push in your ideas.

Do not forget to add corresponding tests to keep up 100% test coverage.

## License
The MIT License

Copyright (c) 2017 Felix Heck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
