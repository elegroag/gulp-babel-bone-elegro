/*eslint quotes: ["error", "double"]*/
/*eslint-env es6*/

var gulp = require("gulp");
var browserify = require("browserify");
require("babelify");
var source = require("vinyl-source-stream");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var browserSync = require("browser-sync").create();
var uglify = require("gulp-uglify");
var minify = require("gulp-minify");
var cleanCSS = require("gulp-clean-css");
var jshint = require("gulp-jshint");
var watchify = require("watchify");
var plumber = require("gulp-plumber");

function onError(err) {
  console.log("Name:", err.name);
  console.log("Reason:", err.reason);
  console.log("File:", err.file);
  console.log("Line:", err.line);
  console.log("Column:", err.column);
}

var paths = {
  pages: ["src/*.html"],
  js: [
    "components/axios/dist/axios.js",
    "components/jquery/dist/jquery.js",
    "components/underscore/underscore-umd.js",
    "components/backbone/backbone.js",
    "components/backbone.localStorage/src/localstorage.js",
    "components/bootstrap/dist/js/bootstrap.bundle.js",
    "components/bootstrap-select/dist/js/bootstrap-select.js",
    "components/moment/dist/moment.js",
    "components/nouislider/dist/nouislider.js",
    "components/perfect-scrollbar/js/perfect-scrollbar.js",
    "components/remarkable-bootstrap-notify/dist/bootstrap-notify.js",
    "components/sweetalert2/src/sweetalert2.js",
    "components/twitter-bootstrap-wizard/jquery.bootstrap.wizard.js",
    "components/validate-bootstrap.jquery/build/validate-bootstrap.jquery.js",
    "components/jquery-sortablejs/jquery-sortable.js",
    "components/Dist-DataTables-Bootstrap5/js/dataTables.bootstrap5.js",
    "components/Dist-DataTables-Responsive-Bootstrap5/js/responsive.bootstrap5.js",
    "components/jquery-validation/dist/jquery.validate.js"
  ],
  css: [
    "components/bootstrap/dist/css/bootstrap.css",
    "components/nouislider/dist/nouislider.css",
    "components/perfect-scrollbar/css/perfect-scrollbar.css",
    "components/font-awesome/css/font-awesome.css"
  ]
};

gulp.task("copy-html", () => {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});

gulp.task("dependencies-css", () => {
  return gulp
    .src(paths.css)
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/assets"));
});

gulp.task(
  "dependencies",
  gulp.series(
    gulp.parallel("dependencies-css"),
    gulp.parallel("copy-html"),
    () => {
      return gulp
        .src(paths.js)
        .pipe(minify({ noSource: true, ignoreFiles: [".min.js", "-min.js"] }))
        .pipe(gulp.dest("dist/assets"));
    }
  )
);

gulp.task("browserify:dev", () => {
  return browserify({
    basedir: ".",
    debug: true,
    entries: ["src/clientes/clientes.module.js"],
    cache: {},
    packageCache: {},
    insertGlobals: true
  })
    .transform("babelify", {
      presets: ["es2015"],
      extensions: [".js"],
      ignore: ["node_modules/", "dist/", "components/"],
      compact: false,
      sourceMaps: false
    })
    .bundle()
    .pipe(source("clientes.bundle.js"))
    .pipe(buffer())
    .pipe(plumber({ errorHandler: onError }))
    .pipe(jshint())
    .pipe(jshint.reporter("default", { verbose: true }))
    .pipe(uglify())
    .pipe(sourcemaps.init({ largeFile: true }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/clientes"));
});

gulp.task("browserify", () => {
  var bundler = browserify({
    basedir: ".",
    debug: true,
    entries: ["src/clientes/clientes.module.js"],
    cache: {},
    packageCache: {},
    insertGlobals: true
  }).transform("babelify", {
    presets: ["es2015"],
    extensions: [".js"],
    ignore: ["node_modules/", "dist/", "components/"],
    compact: true,
    sourceMaps: false
  });

  bundler = watchify(bundler);

  var rebundle = function() {
    return bundler
      .bundle()
      .pipe(source("clientes.bundle.js"))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(minify({ noSource: true }))
      .pipe(sourcemaps.init({ largeFile: true }))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("dist/clientes"));
  };

  bundler.on("update", rebundle);
  return rebundle();
});

gulp.task(
  "serve",
  gulp.series(gulp.parallel("browserify:dev"), () => {
    browserSync.init({
      port: 9000,
      server: {
        baseDir: ["./dist", "index"]
      }
    });

    gulp
      .watch(["src/**/*.html", "src/**/*.css", "src/**/*.js"])
      .on("change", browserSync.reload);
  })
);
