
if ( process.cwd() === __dirname ) {
  console.error(
    'This script calls build.js in the working directory; '
    + 'you just attempted infinite recursion.');
  process.exit(1);
}

var fork = require('child_process').fork;
fork('./build.js');
