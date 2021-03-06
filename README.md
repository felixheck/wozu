![wozu](https://raw.githubusercontent.com/felixheck/wozu/master/assets/logo.png)

#### Server decorator and util to list all defined hapi.js routes

[![Travis](https://img.shields.io/travis/felixheck/wozu.svg)](https://travis-ci.org/felixheck/wozu/builds/) ![node](https://img.shields.io/node/v/wozu.svg) ![npm](https://img.shields.io/npm/dt/wozu.svg) [![standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/) ![npm](https://img.shields.io/npm/l/wozu.svg)
---

- [![Travis](https://travis-ci.org/felixheck/wozu/builds/) !node !npm ![standard](http://standardjs.com/) !npm](#travishttpstravis-ciorgfelixheckwozubuilds-node-npm-standardhttpstandardjscom-npm)
- [Introduction](#introduction)
    - [Compatibility](#compatibility)
- [Installation](#installation)
- [Usage](#usage)
    - [Import](#import)
    - [Create hapi server](#create-hapi-server)
    - [Registration](#registration)
    - [Usage](#usage-1)
- [Usage as Util](#usage-as-util)
- [API](#api)
- [Developing and Testing](#developing-and-testing)
- [Contribution](#contribution)

## Introduction
**wozu** is a plugin in the form of a server decorator and an additional util to list all defined routes of your [hapi.js](https://github.com/hapijs/hapi) server instance. Just call the server method and get a list of all endpoints including paths and methods.<br>
*wozu* is the German translation for *wherefore* - it was implemented as an util related to the plugin [wo](https://github.com/rjrodger/wo).

The modules `standard` and `ava` are used to grant a high quality implementation.

#### Compatibility
| Major Release | [hapi.js](https://github.com/hapijs/hapi) version | node version |
| --- | --- | --- |
| `v4` | `>=18.4 @hapi/hapi` | `>=12` |
| `v3.1` | `>=18.3.1 @hapi/hapi` | `>=8` |
| `v3` | `>=18 hapi` | `>=8` |
| `v2` | `>=17 hapi` | `>=8` |
| `v1` | `>=13 hapi` | `>=6` |

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
Afterwards create your hapi server if not already done:
``` js
const hapi = require('@hapi/hapi');
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
  plugin: require('wo'),
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

(async () => {
  await server.register({
    plugin: require('wo'),
    options: {
      bases,
      route: wozu.list(server),
      sneeze: {
        silent: true
      }
    }
  })
})();
```

## API
`wozu.list(server, [host])`

- `server {Object}` - the corresponding [hapi server object](https://hapijs.com/api#server).
- `host {string|Array.<string>}` - the host to filter routes matching a specific virtual host.

`server.wozu([host])`

- `host {string|Array.<string>}` - the host to filter routes matching a specific virtual host.


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
