var fork = require('child_process').fork;

// Base-case builder.
// Javascript was chosen as an arbitrary platform-agnostic language.

if ( process.argv[2] === '-c' ) {
  var lastdir = process.cwd();
  process.chdir(__dirname + '/src');
  require('fs').unlinkSync('./built_builder.js');
  process.chdir(lastdir);
  process.exit(0);
}

if ( process.argv[2] !== '-r' ) {
  var fork = require('child_process').fork;
  var lastdir = process.cwd();

  // Build this builder using the last builder
  process.chdir(__dirname + '/src');
  fork('../recursive-repo/build.js');
  process.chdir(lastdir);
}

// Run the built builder
if ( process.argv[2] !== '-b' ) {
  if ( process.cwd() === __dirname ) {
    console.error(
      'This script calls build.js in the working directory; '
      + 'you just attempted infinite recursion.');
    process.exit(1);
  }
  fork(__dirname + '/src/built_builder.js');

  /*
  var spawn = require('child_process').spawn;
  var prc = spawn('node',  ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'script/importlistings.jar']);

  //noinspection JSUnresolvedFunction
  prc.stdout.setEncoding('utf8');
  prc.stdout.on('data', function (data) {
      var str = data.toString()
      var lines = str.split(/(\r?\n)/g);
      console.log(lines.join(""));
  });

  prc.on('close', function (code) {
      console.log('process exit code ' + code);
  });
  */
}

