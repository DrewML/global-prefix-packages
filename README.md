# global-prefix-packages

Find all globally installed `npm` modules matching a prefix.

## Install

Install with [`npm`](https://www.npmjs.com/)

```
$ npm install --save global-prefix-packages
```

## Usage

```javascript
const globalPrefixPkgs = require('global-prefix-packages');

globalPrefixPkgs('foo-plugin-').then(packages => {
    console.log(packages); // ['foo-plugin-bar'] 
});
```

## TODO:

1. Support scoped packages
