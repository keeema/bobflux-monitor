var gulp = require('gulp');
var clean = require('gulp-clean');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var ts = require('typescript'); //required just to have constants
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var staticServer = require('node-static');
var tslint = require('gulp-tslint');
// bobril-build parts
var compilationCache = require('bobril-build/src/compilationCache');
var bobrilDepsHelpers = require('bobril-build/src/bobrilDepsHelpers');

var dist = './dist/';
var src = './src/';

function write(filePath, content) {
  console.log('# write:', filePath);
  var outputFilePath = path.join(dist, filePath);
  mkdirp.sync(path.dirname(outputFilePath));
  fs.writeFileSync(outputFilePath, new Buffer(content));
};

function startWebserver(port) {
  var file = new staticServer.Server(dist, {
    cache: false
  });
  var webserver = require('http').createServer(function(request, response) {
    request.addListener('end', function() {
      file.serve(request, response);
    }).resume();
  });
  var webserverSockets = {};
  var nextWebserverSocketId = 0;
  webserver.on('connection', function(socket) {
    var socketId = nextWebserverSocketId++;
    webserverSockets[socketId] = socket;
    socket.on('close', function() {
      delete webserverSockets[socketId];
    })
  });

  webserver.on('error', function(err) {
    if (err.code == 'EADDRINUSE') {
      console.log(chalk.red('Port ' + port + ' is already in use.'));
      process.exit(1);
    }
  });

  webserver.listen(port);

  var serverUrl = 'http://localhost:' + port;
  console.log('Server started on ', serverUrl);
};

gulp.task('serve-dist', function() {
  startWebserver(8000);
});

gulp.task('clean-dist', function() {
  return gulp.src(dist, {
      force: true
    })
    .pipe(clean());
});

gulp.task('tslint', function(){
      return gulp.src('./src/**/*.*')
        .pipe(tslint())
        .pipe(tslint.report('verbose'),{
          emitError: false
        });
});

gulp.task('tslint-watch', function() {
  runSequence('tslint', function() {
    watch('./src/**/*.ts', function() {
      return runSequence('tslint');
    });
  });
});

gulp.task('build-src', ['clean-dist'], function() {
  var cc = new compilationCache.CompilationCache();
  return cc.compile({
    dir: __dirname,
    main: src + 'app.ts',
    options: {
      target: ts.ScriptTarget.ES5,
      module: ts.ModuleKind.AMD,
      suppressExcessPropertyErrors: true
    },
    spriteMerge: false,
    writeFileCallback: write
  }).then(function() {
    bobrilDepsHelpers.writeSystemJsBasedDist(write, src + 'app.js', {})
  });
});

gulp.task('default', ['build-src']);

gulp.task('watch', function() {
  runSequence('default', 'serve-dist', function() {
    watch(['./src/**/*.ts','./node_modules/**/*.ts'], function() {
      return runSequence('default');
    });
  });
});
