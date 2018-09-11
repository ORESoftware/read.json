'use strict';

import path = require('path');
import chalk from 'chalk';
import {EVCb} from './index';
import * as fs from 'fs';

const ignoreMissingProp = process.argv.indexOf('--ignore-missing') > 0;

const keyIndex = process.argv.indexOf('-k');

let keyv = '';

if (keyIndex > 0) {
  keyv = process.argv[keyIndex + 1];
  if (!keyv) {
    throw chalk.magentaBright.bold('read.json: Must pass a keypath to read as the second argument.');
  }
}


const evalIndex = process.argv.indexOf('--eval');
let evalExpression = '';

if (evalIndex > 0) {
  evalExpression = process.argv[evalIndex + 1];
  if (!evalExpression) {
    throw chalk.magenta('You passed --eval, but no subsequent argument was passed.');
  }
}

const getFileData = (cb: EVCb<string>) => {
  
  const index = process.argv.indexOf('-f');
  
  if (index > 1) {
    
    let jsonFile = process.argv[index + 1];
    
    if (!path.isAbsolute(jsonFile)) {
      jsonFile = path.resolve(process.cwd() + '/' + jsonFile);
    }
    
    return fs.readFile(jsonFile, (err, data) => {
      
      if (err) {
        console.error(chalk.magenta('read.json: Could not load json file at path:'), chalk.magenta.bold(jsonFile));
        throw chalk.magenta(err.message);
      }
      
      cb(null, String(data).trim());
    });
  }
  
  let stdout = '';
  process.stdin.resume().on('data', d => {
    stdout += String(d);
  })
  .once('end', () => {
    cb(null, stdout);
  });
  
};

getFileData((err, data) => {
  
  if (err) {
    throw err;
  }
  

  let obj = JSON.parse(data);
  
  if (evalExpression) {
    console.log(eval(`obj${evalExpression}`));
    process.exit(0);
  }
  
  const keys = String(keyv).split('.').filter(Boolean);
  
  while (obj && keys.length) {
    obj = obj[keys.shift()];
  }
  
  if (obj && typeof obj === 'object') {
    obj = JSON.stringify(obj);
  }
  
  console.log(obj || '');
  process.exit(0);
  
});

// const expression = `obj[keyv]`;
// try {
//   let value = eval(expression);
//   if (value === undefined && !ignoreMissingProp) {
//     throw 'read.json: Accessed value was undefined - missing property/path.'
//   }
//   else if (value === undefined) {
//     value = '';
//   }
//
//   if (value && typeof value === 'object') {
//     console.log(JSON.stringify(value));
//   }
//   else {
//     console.log(value);
//   }
//
// }
// catch (err) {
//   console.error(chalk.magenta(`read.json: Could not evaluate expression - could not read property: "${keyv}".`));
//   console.error(chalk.magentaBright(`read.json: You may wish to use "'${keyv}'" instead of "${keyv}".`));
//   throw err.message || err;
// }
//

