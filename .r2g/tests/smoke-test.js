#!/usr/bin/env node
'use strict';

/*

 docker.r2g notes:

 this file will be copied to this location:

 $HOME/.r2g/temp/project/smoke-test.js

 and it will then be executed with:

 node smoke-test.js


 so, write a smoke test in this file, which only calls require() against your library.
 for example if your library is named "foo.bar", then the *only* require call you
 should make is to require('foo.bar'). If you make require calls to any other library
 in node_modules, then you will got non-deterministic results. require calls to core/built-in libraries are fine.

*/


const assert = require('assert');
const path = require('path');
const cp = require('child_process');
const os = require('os');
const fs = require('fs');
const EE = require('events');


const k = cp.spawn('bash');

k.stdin.end(
  ` cd node_modules/@oresoftware/read.json; 
    npm link -f; 
    foo="$(read.json -f package.json -k 'name')";
    if [ "$foo" != "@oresoftware/read.json" ]; then
       echo >&2 "foo is actually $foo instead...";
       exit 1;
    fi
   `
);

k.stderr.pipe(process.stderr);

k.once('exit', function(code){
  process.exit(code);
});



// your test goes here
