var fs = require('fs');
((fs, dir) => !fs.existsSync(dir) && fs.mkdirSync(dir))(fs, __dirname + '/../../bin');
fs.writeFileSync(__dirname + '/../../bin/builder.js', `
// Base-case builder.
// Javascript was chosen as an arbitrary platform-agnostic language.

if ( process.cwd() === __dirname ) {
  console.error(
    'This script calls build.js in the working directory; '
    + 'you just attempted infinite recursion.');
  process.exit(1);
}

var fork = require('child_process').fork;
fork('./build.js');
`);
