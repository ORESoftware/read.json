#!/usr/bin/env node
'use strict';

import path = require('path');
import chalk from 'chalk';

let jsonFile = process.argv[2];
let keyv = process.argv[3] || '';
const ignoreMissingProp = process.argv.indexOf('--ignore-missing') > 0;

if (!jsonFile) {
  throw chalk.magentaBright.bold('read.json: Must pass a path to a json file as the first argument.');
}

if (!path.isAbsolute(jsonFile)) {
  jsonFile = path.resolve(process.cwd() + '/' + jsonFile);
}

if (!keyv) {
  throw chalk.magentaBright.bold('read.json: Must pass a keypath to read as the second argument.');
}

let obj = null;

try {
  obj = require(jsonFile);

}
catch (err) {
  console.error(chalk.magenta('read.json: Could not load json file at path:'), chalk.magenta.bold(jsonFile));
  throw err.message;
}

const expression = `obj[keyv]`;
try {
  let value = eval(expression);
  if (value === undefined && !ignoreMissingProp) {
    throw 'read.json: Accessed value was undefined - missing property/path.'
  }
  else if (value === undefined) {
    value = '';
  }

  if (value && typeof value === 'object') {
    console.log(JSON.stringify(value));
  }
  else {
    console.log(value);
  }

}
catch (err) {
  console.error(chalk.magenta(`read.json: Could not evaluate expression - could not read property: "${keyv}".`));
  console.error(chalk.magentaBright(`read.json: You may wish to use "'${keyv}'" instead of "${keyv}".`));
  throw err.message || err;
}


