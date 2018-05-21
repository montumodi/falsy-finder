# Falsy Finder (Work in progress)

[![Greenkeeper badge](https://badges.greenkeeper.io/montumodi/falsy-finder.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/montumodi/falsy-finder/badge.svg?branch=master)](https://coveralls.io/github/montumodi/falsy-finder?branch=master)
[![Build Status](https://travis-ci.org/montumodi/falsy-finder.svg?branch=master)](https://travis-ci.org/montumodi/falsy-finder)
[![Deps](https://david-dm.org/montumodi/falsy-finder.svg)](https://david-dm.org/montumodi/falsy-finder#info=dependencies)
[![devDependency Status](https://david-dm.org/montumodi/falsy-finder/dev-status.svg)](https://david-dm.org/montumodi/falsy-finder#info=devDependencies)

[![NPM](https://nodei.co/npm/falsy-finder.png?downloads=true)](https://www.npmjs.com/package/falsy-finder/)

A simple utility to find out falsy values from an object or arrays. It returns all the keys along with values in an array. By default it will look for following falsy values:

```
"",
null,
undefined,
NaN,
Infinity
```

This behavior cane be customized by passing options while creating finder. See [options](#options)

## How to install

```
npm install falsy-finder -S
```

## Getting Started

The basic syntax is:

```js
const createFinder = require("falsy-finder");

const finder = createFinder();

const someJsonWithNullValues = {
  "data": {
    "firstName": "",
    "lastName": "Ashish",
    "address": {
      "city": null,
      "street": "London"
    },
    "tags": [
      "Hi",
      "hello",
      "",
      undefined
    ]
  }
}
const result = finder.getFalsyValues(someJsonWithNullValues);

Result:

[{
        key: 'firstName',
        value: ''
    },
    {
        key: 'city',
        value: null
    },
    {
        key: 'tags',
        value: ''
    },
    {
        key: 'tags',
        value: null
    }
]
```

Ths syntax using options:

```js

const createFinder = require("falsy-finder");

const options = {"falsyValues": ["my", "custom", null , "and", undefined]};

const finder = createFinder(options);

```

### Options

The `getFinder` method supports following options

* `falsyValues`: (array) The custom falsy values array to check against. - default: `["", null, undefined, NaN, Infinity]`