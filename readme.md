# Falsy Finder (Work in progress)

[![Greenkeeper badge](https://badges.greenkeeper.io/montumodi/falsy-finder.svg)](https://greenkeeper.io/)
[![NPM](https://nodei.co/npm/falsy-finder.png?downloads=true)](https://www.npmjs.com/package/falsy-finder/)
[![Build Status](https://travis-ci.org/montumodi/falsy-finder.svg?branch=master)](https://travis-ci.org/montumodi/falsy-finder)
A simple utility to find out falsy values from an object or arrays. It return all the keys along with values in an array. By default it will look for following falsy values:

```
"",
null,
undefined,
NaN,
Infinity,
''
```

## How to install

```
npm install falsy-finder -S
```

## Getting Started

The basic syntax is:

```js
const finder = require("falsy-finder")();

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
