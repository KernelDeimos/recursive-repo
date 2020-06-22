var lastdir = process.cwd();
process.chdir(__dirname + '/src/example');

var spawn = require('child_process').spawn;

const child = spawn('node', ['../../build.js']);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
child.on('close', (code) => {
  console.log('test finished');
});

