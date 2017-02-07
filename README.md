#### Util to list all defined hapi.js routes

[![Travis](https://img.shields.io/travis/felixheck/wozu.svg)](https://travis-ci.org/felixheck/wozu/builds/) ![node](https://img.shields.io/node/v/wozu.svg) ![npm](https://img.shields.io/npm/dt/wozu.svg)
---

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API](#api)
5. [Developing and Testing](#developing-and-testing)
6. [Contribution](#contribution)
7. [License](#license)

## Introduction
**wozu** is a util to list all defined routes of your [hapi.js](https://github.com/hapijs/hapi) server instance. Just pass the instance and get a list of all endpoints including paths and methods. *wozu* is the German translation for *wherefore* - it was implemented as an util related to the plugin [wo](https://github.com/rjrodger/wo).

This plugin is implemented in ECMAScript 6. Additionally `standard` and `ava` are used to grant a high quality implementation.

## Installation
For installation use the [Node Package Manager](https://github.com/npm/npm):
```
$ npm install --save wozu
```

or clone the repository:
```
$ git clone https://github.com/felixheck/wozu
```

Alternatively use the [Yarn Package Manager](https://yarnpkg.com):
```
$ yarn add wozu
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
const server = new Hapi.Server();

server.connection({
  port: 8888,
  host: 'localhost',
});
```

Additionally register all your routes.

#### Registration
Finally use the util in the required context. For example during the registration of `wo`:

``` js
server.register({
  register: require('wo'),
  options: {
    bases,
    route: wozu(server),
    sneeze: {
      silent: true
    }
  }
})
```

It is important that this util just lists routes actually defined while execution.

## API
`wozu(server)`

- `server {hapi.Server}` - related hapi server instance.


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
