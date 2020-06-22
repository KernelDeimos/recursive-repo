var spawn = require('child_process').spawn;
var fork = require('child_process').fork;

lastdir = process.cwd();

process.chdir(__dirname + '/src/builder');

const child = spawn('node', [__dirname + '/recursive-repo/build.js']);
child.on('close', (code) => {
  process.chdir(lastdir);

  if ( process.argv[2] !== '-b' ) {
    if ( process.cwd() === __dirname ) {
      console.error(
        'This script calls build.js in the working directory; '
        + 'you just attempted infinite recursion.');
      process.exit(1);
    }
    const child2 = spawn('node', [__dirname + '/bin/builder.js']);
    child2.stdout.on('data', chunk => console.log(chunk.toString()));
    child2.stderr.on('data', chunk => console.error(chunk.toString()));
    child2.on('close', (code) => {
      //
    });
  }
});

